import UserModel from '~/models/User.model'
import chatProvider from '~/services/Chat.service'
import { SocketIo } from '~/types'

class ChatIo {
    joinRoom = (socket: SocketIo) =>
        socket.on('joinRoom', (idUser) => socket.join(idUser))
    leaveRoom = (socket: SocketIo) =>
        socket.on('leaveRoom', (idUser) => socket.leave(idUser))
    chat = (socket: SocketIo) =>
        socket.on('chat', async (data) => {
            await chatProvider.chat(data.idUserChat, data.idUser, data.message)
            const dataChat = await chatProvider.recentlyChat(data.idUserChat, data.idUser)
            const user = await UserModel.findById(data.idUser)
            const userChat = await UserModel.findById(data.idUserChat)
            if (!dataChat || !user || !userChat) return
            socket
                .to(data.idUserChat)
                .emit('notifyMessage', { ...user._doc, chat: dataChat })
            socket.emit('notifyMessage', { ...userChat._doc, chat: dataChat })
            socket
                .to(data.idUserChat)
                .emit('sendMessage', { ...dataChat, idUserChat: data.idUserChat })
            socket.emit('sendMessage', { ...dataChat, idUserChat: data.idUserChat })
        })
    seen = (socket: SocketIo) =>
        socket.on('seen', async (data) => {
            const chat = await chatProvider.seen(data.idContentChat)
            const user = await UserModel.findById(data.idUser)
            if (!chat || !user) return
            socket.emit('notifyMessage', {
                ...user._doc,
                chat,
            })
        })
    delete = (socket: SocketIo) =>
        socket.on('delete', async (data) => {
            const chat = await chatProvider.delete(
                data.idContentChat,
                data.idUserisDeleteReceive,
                data.isDeleteSend,
            )
            const user = await UserModel.findById(data.idUser)
            if (!chat || !user) return
            socket.emit('notifyDelete', {
                ...user._doc,
                chat,
            })
        })
}

export default new ChatIo()
