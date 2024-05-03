// import { PopulateOption } from 'mongoose'
import { HttpStatus } from '~/http-status.enum'
import BoxChatModel from '~/models/BoxChat.model'
import ContentChatModel from '~/models/ContentChat.model'
import RoomChatModel from '~/models/RoomChat.model'
import UserModel from '~/models/User.model'
import { DeleteChat, DetailChat } from '~/types'
import { BoxChat } from '~/types/boxChat'
import { ResUsersChat } from '~/types/chat'
import { User } from '~/types/user'
import { httpResponse } from '~/utils/HandleRes'

export class ChatService {
    async users(user: Omit<User, 'password'>) {
        const boxChats = await BoxChatModel.find<{
            idUserChat: User
            idRoom: string
        }>({
            idUser: user._id,
            isDelete: false,
        })
            .populate({
                path: 'idUserChat',
                select: {
                    _id: true,
                    userName: true,
                    fullName: true,
                    avatar: true,
                    verify: true,
                },
            })
            .sort({ createdAt: 'desc' })
            .select({
                idUserChat: true,
                idRoom: true,
            })
        if (boxChats.length === 0) return httpResponse(HttpStatus.OK, [])
        const users = boxChats.map((item) => ({
            ...item.idUserChat._doc,
            idRoom: item.idRoom,
        }))
        const userChat = await Promise.all(
            users.map(async (item) => {
                const message = await this.recentlyChat(item.idRoom)
                if (!message)
                    return {
                        message: null,
                        ...item,
                    }
                return {
                    message,
                    ...item,
                }
            }),
        )
        const userChats: ResUsersChat[] = userChat.filter((chat) => chat)
        return httpResponse(HttpStatus.OK, userChats)
    }
    async idRoom(idUserChat: string, idUser: string) {
        const userChat = await UserModel.findOne({ _id: idUserChat })
        if (!userChat)
            throw httpResponse(HttpStatus.UNAUTHORIZED, { msg: 'Unauthorized' })
        const roomChat = await RoomChatModel.findOne(
            {
                $and: [{ members: userChat._id }, { members: userChat._id }],
            },
            { _id: true },
        )
        if (roomChat) return roomChat._id
        const room = await RoomChatModel.create({
            members: [idUser, userChat._id],
        })
        return room._id
    }
    protected async findOrCreateBoxChat(
        idUser: string,
        idUserChat: string,
        idRoom: string,
    ) {
        const boxChat = await BoxChatModel.findOne({
            idRoom: idRoom,
            idUser,
            idUserChat,
        })
        if (boxChat) return boxChat
        const newBoxChat = await BoxChatModel.create({
            idRoom: idRoom,
            idUser,
            idUserChat,
        })
        return newBoxChat
    }
    protected async createBoxChatAndUpdate(boxChat: BoxChat, detailChat: DetailChat) {
        const content = await ContentChatModel.create({
            message: detailChat.message,
            idUser: boxChat.idUser,
            idBoxChat: boxChat._id,
        })
        BoxChatModel.updateOne(
            { _id: boxChat._id },
            { $push: { contentChat: content._id } },
        )
        return content
    }
    async chat(idUser: string, room: string, detailChat: DetailChat) {
        const roomChat = await RoomChatModel.findOne({ _id: room }).select({
            members: true,
        })
        if (!roomChat) throw httpResponse(HttpStatus.NOT_FOUND, { msg: 'Room not found' })
        const members = roomChat.members.map((item) => item.toString())
        const idUserChat = members.find((item) => item !== idUser)
        const userChat = (await UserModel.findById(idUserChat).select({
            password: false,
        }))!
        const boxChat = await this.findOrCreateBoxChat(idUser, userChat._id, room)
        const contentChat = await this.createBoxChatAndUpdate(boxChat, detailChat)
        return { contentChat, members, userChat }
    }
    async boxChat(idRoom: string) {
        // const boxChats = await BoxChatModel.find({ idRoom }).populate('contentChat')
        // const contentChats = boxChats.reduce<ContentChat[]>((init, boxChat) => {
        //     return init.concat(boxChat.contentChat)
        // }, [])
        const idBoxChats = (
            await BoxChatModel.find({ idRoom }).select({ _id: true })
        ).map((item) => item._id)
        const contentChats = await ContentChatModel.find({
            idBoxChat: {
                $in: idBoxChats,
            },
        }).sort({ createdAt: -1 })
        const contentChatsSort = contentChats.sort(
            (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
        )
        return httpResponse(HttpStatus.OK, contentChatsSort)
    }
    async recentlyChat(idRoom: string) {
        const { data: boxChats } = await this.boxChat(idRoom)
        if (boxChats.length === 0) return false
        if (boxChats.length === 0) return false
        const chat = boxChats[boxChats.length - 1]
        return chat._doc
    }
    async seen(_id: string, idMe: string) {
        const contentChat = await ContentChatModel.findById(_id)
        if (!contentChat)
            throw httpResponse(HttpStatus.NOT_FOUND, { msg: 'Content chat not found' })
        await contentChat.updateOne({ $set: { isSeen: true } })
        const contentChatSeen = (await ContentChatModel.findById(_id))!
        const user = (await UserModel.findById(contentChat.idUser).select({
            password: false,
        }))!
        const idRoom = await this.idRoom(user._id, idMe)
        return {
            contentChat: contentChatSeen._doc,
            idRoom,
            user,
        }
    }
    async delete(_id: string, data: DeleteChat) {
        const contentChat = await ContentChatModel.findById(_id)
        if (!contentChat)
            throw httpResponse(HttpStatus.NOT_FOUND, { msg: 'Content chat not found' })
        await contentChat.updateOne({ $set: data })
        return (await ContentChatModel.findById(_id))!._doc
    }
}

const chatProvider = new ChatService()
export default chatProvider
