import { Server } from 'socket.io'
import { Express } from 'express'
import authRoute from './authRoute'
import userRoute from './userRoute'
import postsRoute from './postsRoute'
import imageRoute from './imageRoute'
import ChatIo from '~/realTime/ChatIo'
import chatRoute from './chatRoute'
import { ServerToClientEvents, ClientToServerEvents, InterServerEvents } from '~/types'
import Notify from '~/realTime/Notify'
import notifyRoute from './notifyRoute'
import ImageController from '~/controllers/Image.controller'
import { UserNoPassword } from '~/types/user'
import { accuracySocket } from '~/middlewares/Token.middleware'

function Routers(app: Express) {
    app.get('/images/*', ImageController.handleImage)
    app.use('/api/auth', authRoute)
    app.use('/api/user', userRoute)
    app.use('/api/posts', postsRoute)
    app.use('/api/image', imageRoute)
    app.use('/api/chat', chatRoute)
    app.use('/api/notify', notifyRoute)
}

export default Routers

const ioEvent = (
    io: Server<
        ServerToClientEvents,
        ClientToServerEvents,
        InterServerEvents,
        UserNoPassword
    >,
) => {
    io.use(accuracySocket)
    io.on('connection', (socket) => {
        socket.join(socket.data._id.toString())
        ChatIo.joinRoom(socket)
        ChatIo.leaveRoom(socket)
        ChatIo.chat(socket)
        ChatIo.seen(socket)
        ChatIo.delete(socket)
        ChatIo.recall(socket)

        Notify.notificationLike(socket)
        Notify.notificationComment(socket)
        socket.on('disconnect', () => console.log('discounect !'))
    })
}
export { ioEvent }
