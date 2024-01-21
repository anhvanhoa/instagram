import { Server } from 'socket.io'
import { Express } from 'express'
import authRoute from './authRoute'
import userRoute from './userRoute'
import postsRoute from './postsRoute'
import imageRoute from './imageRoute'
import ChatIo from '~/realTime/ChatIo'
import chatRoute from './chatRoute'
import {
    ServerToClientEvents,
    ClientToServerEvents,
    InterServerEvents,
    SocketData,
} from '~/types'
import Notify from '~/realTime/Notify'
import notifyRoute from './notifyRoute'

function Routers(app: Express) {
    app.use('/api/auth', authRoute)
    app.use('/api/user', userRoute)
    app.use('/api/posts', postsRoute)
    app.use('/api/image', imageRoute)
    app.use('/api/chat', chatRoute)
    app.use('/api/notify', notifyRoute)
}

export default Routers

const ioEvent = (
    io: Server<ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData>,
) => {
    io.on('connection', (socket) => {
        socket.emit('connect_server', socket.id)
        ChatIo.joinRoom(socket)
        ChatIo.leaveRoom(socket)
        ChatIo.chat(socket)
        ChatIo.seen(socket)
        ChatIo.delete(socket)
        Notify.notificationLike(socket)
        Notify.notificationComment(socket)
        socket.on('disconnect', () => console.log('discounect !'))
    })
}
export { ioEvent }
