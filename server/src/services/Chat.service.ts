import BoxChatModel from '~/models/BoxChat.model'
import ContentChatModel from '~/models/ContentChat.model'
import RoomChatModel from '~/models/RoomChat.model'
import UserModel from '~/models/User.model'
import { DeleteChat, DetailChat } from '~/types/socket'
import { BoxChat } from '~/types/boxChat'
import { ResUsersChat } from '~/types/chat'
import { User } from '~/types/user'
import { BadRequestError } from '~/utils/Errors'

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
        if (boxChats.length === 0) return []
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
        return userChats
    }
    async idRoom(idUserChat: string, idUser: string) {
        const userChat = await UserModel.findOne({ _id: idUserChat })
        if (!userChat)
            throw new BadRequestError({
                message: 'Not found user chat',
            })
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
        await BoxChatModel.updateOne(
            { _id: boxChat._id },
            { $push: { contentChat: content._id } },
        )
        return content
    }
    async chat(idUser: string, room: string, detailChat: DetailChat) {
        const roomChat = await RoomChatModel.findOne({ _id: room }).select({
            members: true,
        })
        if (!roomChat) throw new BadRequestError({ message: 'Room not found' })
        const members = roomChat.members.map((item) => item.toString())
        const idUserChat = members.find((item) => item !== idUser)
        const userChat = (await UserModel.findById(idUserChat).select({
            password: false,
        }))!
        // Tạo box chat cho người gửi
        const boxChat = await this.findOrCreateBoxChat(idUser, userChat._id, room)
        // Tạo box chat cho người được gửi
        await this.findOrCreateBoxChat(userChat._id, idUser, room)
        // Thêm tin nhắn vào box chat
        const contentChat = await this.createBoxChatAndUpdate(boxChat, detailChat)
        return { contentChat, members, userChat }
    }
    async boxChat(idRoom: string) {
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
        return contentChatsSort
    }
    async recentlyChat(idRoom: string) {
        const result = (await this.boxChat(idRoom))!
        if (result.length === 0) return false
        if (result.length === 0) return false
        const chat = result[result.length - 1]
        return chat._doc
    }
    async seen(_id: string) {
        const contentChat = await ContentChatModel.findById(_id)
        if (!contentChat) throw new BadRequestError({ message: 'Content chat not found' })
        await contentChat.updateOne({ $set: { isSeen: true } })
        const contentChatSeen = (await ContentChatModel.findById(_id))!
        const boxChat = (await BoxChatModel.findOne({
            contentChat: contentChatSeen._id,
        }).select({
            idRoom: true,
        }))!
        const user = (await UserModel.findById(contentChat.idUser).select({
            password: false,
        }))!
        // const idRoom = await this.idRoom(user._id, idMe)
        const idRoom = String(boxChat.idRoom)
        return {
            contentChat: contentChatSeen._doc,
            idRoom,
            user,
        }
    }
    async delete(_id: string, data: DeleteChat) {
        const contentChat = await ContentChatModel.findById(_id)
        if (!contentChat) throw new BadRequestError({ message: 'Content chat not found' })
        await contentChat.updateOne({ $set: data })
        return (await ContentChatModel.findById(_id))!._doc
    }
}

const chatProvider = new ChatService()
export default chatProvider
