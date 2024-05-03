import chatProvider from '~/services/Chat.service'
import { SocketIo } from '~/types/socket'

class ChatIo {
    joinRoom = (socket: SocketIo) =>
        socket.on('joinRoom', (idRoom) => {
            socket.join(idRoom)
        })
    leaveRoom = (socket: SocketIo) =>
        socket.on('leaveRoom', (idUser) => socket.leave(idUser))
    chat = (socket: SocketIo) =>
        socket.on('chat', async (room, data) => {
            const idUser = socket.data._id.toString()
            const { members, contentChat, userChat } = await chatProvider.chat(
                idUser,
                room,
                data,
            )
            socket.to(members).emit('notifyMessage', {
                message: contentChat,
                idRoom: room,
                ...userChat._doc,
            })
            socket.emit('notifyMessage', {
                message: contentChat,
                idRoom: room,
                ...socket.data,
            })
            socket.to(room).emit('message', contentChat)
            socket.emit('message', contentChat)
        })
    seen = (socket: SocketIo) =>
        socket.on('seen', async (id) => {
            const idMe = socket.data._id.toString()
            const { user, contentChat, idRoom } = await chatProvider.seen(id, idMe)
            socket.emit('notifyMessage', {
                message: contentChat,
                idRoom,
                ...user._doc,
            })
        })
    delete = (socket: SocketIo) =>
        socket.on('delete', async (id, data) => {
            const chat = await chatProvider.delete(id, data)
            socket.emit('notifyDelete', chat)
        })
    recall = (socket: SocketIo) =>
        socket.on('recall', async (id, idRoom, data) => {
            const chat = await chatProvider.delete(id, data)
            socket.emit('notifyDelete', chat)
            socket.to(idRoom).emit('notifyDelete', chat)
        })
}

export default new ChatIo()
