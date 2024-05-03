import { Socket } from 'socket.io'
import notificationProvider from '~/services/Notification.service'
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents } from '~/types'
import { UserNoPassword } from '~/types/user'

class Notify {
    notificationLike = (
        socket: Socket<
            ServerToClientEvents,
            ClientToServerEvents,
            InterServerEvents,
            UserNoPassword
        >,
    ) =>
        socket.on('like', async (data) => {
            const response = await notificationProvider.notification(
                data,
                'liked the article',
            )
            if (typeof response === 'string') return socket.emit('notify_error', response)
            socket.to(data.toUser).emit('notification', response._doc)
        })
    notificationComment = (
        socket: Socket<
            ServerToClientEvents,
            ClientToServerEvents,
            InterServerEvents,
            UserNoPassword
        >,
    ) =>
        socket.on('comment', async (data) => {
            const response = await notificationProvider.notification(
                data,
                'comment the article',
            )
            if (typeof response === 'string') return socket.emit('notify_error', response)
            socket.to(data.toUser).emit('notification', response._doc)
        })
}

export default new Notify()
