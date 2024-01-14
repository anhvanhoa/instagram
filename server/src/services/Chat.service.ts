import { PopulateOption } from 'mongoose'
import { HttpStatus } from '~/http-status.enum'
import BoxChatModel from '~/models/BoxChat.model'
import ContentChatModel from '~/models/ContentChat.model'
import RoomChatModel from '~/models/RoomChat.model'
import UserModel from '~/models/User.model'
import { ContentChat, User } from '~/types'
import { httpResponse } from '~/utils/HandleRes'

export class ChatService {
    async users(userName: string) {
        const user = await UserModel.findOne({ userName })
        if (!user) throw httpResponse(HttpStatus.UNAUTHORIZED, { msg: 'Unauthorized' })
        const users = (
            await BoxChatModel.find<{ idUserChat: User }>({
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
        ).map((item) => item.idUserChat._doc)
        const userChat = await Promise.all(
            users.map(async (item) => {
                const chat = await this.recentlyChat(item._id, user._id)
                if (!chat) return null
                return {
                    chat,
                    ...item,
                }
            }),
        )
        const userChats = userChat.filter((chat) => chat)
        return httpResponse(HttpStatus.OK, userChats)
    }
    async idRoom(idUserChat: string, idUser: string) {
        const user = await UserModel.findOne({ _id: idUser })
        const userChat = await UserModel.findOne({ _id: idUserChat })
        if (!user || !userChat)
            throw httpResponse(HttpStatus.UNAUTHORIZED, { msg: 'Unauthorized' })
        const roomChat = await RoomChatModel.findOne(
            {
                $and: [
                    { members: { $elemMatch: { idUser: user._id } } },
                    { members: { $elemMatch: { idUser: userChat._id } } },
                    { members: { $size: 2 } },
                ],
            },
            { _id: true },
        )
        if (roomChat) return roomChat._id
        const room = await RoomChatModel.create({
            members: [{ idUser: user._id }, { idUser: userChat._id }],
        })
        return room._id
    }
    protected async createBoxChat(idUserChat: string, idUser: string, idRoom: string) {
        const boxChat = await BoxChatModel.findOne({
            idRoom: idRoom,
            idUser: idUser,
            idUserChat: idUserChat,
        })
        if (boxChat) return boxChat
        const newBoxChat = await BoxChatModel.create({
            idRoom: idRoom,
            idUser: idUser,
            idUserChat: idUserChat,
        })
        return newBoxChat
    }
    protected async createBoxChatAndUpdate(
        idUserChat: string,
        idUser: string,
        idRoom: string,
        message: string,
    ) {
        const boxChat = await this.createBoxChat(idUserChat, idUser, idRoom)
        const content = await ContentChatModel.create({
            message: message,
            idUser: idUser,
            idBoxChat: boxChat._id,
        })
        await boxChat.updateOne({ $push: { contentChat: content._id } })
    }
    async chat(idUserChat: string, idUser: string, message: string) {
        const idRoom = await this.idRoom(idUserChat, idUser)
        await this.createBoxChat(idUser, idUserChat, idRoom)
        await this.createBoxChatAndUpdate(idUserChat, idUser, idRoom, message)
    }
    async boxChat(userName: string, idUserChat: string) {
        const user = await UserModel.findOne({ userName })
        const userChat = await UserModel.findOne({ _id: idUserChat })
        if (!user || !userChat)
            throw httpResponse(HttpStatus.UNAUTHORIZED, { msg: 'Unauthorized' })
        const roomChat = await RoomChatModel.findOne(
            {
                $and: [
                    { members: { $elemMatch: { idUser: user._id } } },
                    { members: { $elemMatch: { idUser: userChat._id } } },
                    { members: { $size: 2 } },
                ],
            },
            { _id: true },
        )
        if (!roomChat) return httpResponse(HttpStatus.OK, [])
        const boxChats = await BoxChatModel.find({
            idRoom: roomChat._id,
        }).populate<PopulateOption>({
            path: 'contentChat',
            match: { isDeleteSend: false, isDeleteReceive: false },
        })
        if (boxChats.length === 0) return httpResponse(HttpStatus.OK, [])
        const boxChat = boxChats
            .reduce<ContentChat[]>((init, item) => init.concat(item.contentChat), [])
            .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
        return httpResponse(HttpStatus.OK, boxChat)
    }
    async recentlyChat(idUserChat: string, idUser: string) {
        const user = await UserModel.findOne({ _id: idUser })
        const userChat = await UserModel.findOne({ _id: idUserChat })
        if (!user || !userChat)
            throw httpResponse(HttpStatus.UNAUTHORIZED, { msg: 'Unauthorized' })
        const roomChat = await RoomChatModel.findOne(
            {
                $and: [
                    { members: { $elemMatch: { idUser: user._id } } },
                    { members: { $elemMatch: { idUser: userChat._id } } },
                    { members: { $size: 2 } },
                ],
            },
            { _id: true },
        )
        if (!roomChat) return false
        const boxChats = await BoxChatModel.find({
            idRoom: roomChat._id,
        }).populate<PopulateOption>({
            path: 'contentChat',
            match: { isDeleteSend: false, isDeleteReceive: false },
        })
        if (boxChats.length === 0) return false
        const boxChat = boxChats
            .reduce<ContentChat[]>((init, item) => init.concat(item.contentChat), [])
            .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
        const chat = boxChat[boxChat.length - 1]
        return chat._doc
    }
    async seen(_id: string) {
        await ContentChatModel.updateOne({ _id }, { $set: { isSeen: true } })
        return (await ContentChatModel.findById(_id))?._doc
    }
    async recall(_id: string, isDeleteReceive: boolean, isDeleteSend: boolean) {
        await ContentChatModel.updateOne(
            { _id },
            { $set: { isDeleteSend, isDeleteReceive } },
        )
        return (await ContentChatModel.findById(_id))?._doc
    }
}

const chatProvider = new ChatService()
export default chatProvider
