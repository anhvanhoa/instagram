import { Socket } from 'socket.io'
import { ContentChat, ResUsersChat } from '~/types/chat'
import { NotificationSchema } from '~/types/notification'
import { UserNoPassword } from '~/types/user'

export interface DetailChat {
    message: string
    type: string
}

export interface DeleteChat {
    idUserisDeleteReceive?: boolean
    isDeleteSend?: boolean
}

export interface NotificationEmit {
    fromUser: string
    toUser: string
    idPosts: string
}

export interface ServerToClientEvents {
    joinRoom: (idRoom: string | string[]) => void
    leaveRoom: (idRoom: string) => void
    chat: (room: string, data: DetailChat) => void
    seen: (idContentChat: string) => void
    like: (data: NotificationEmit) => void
    comment: (data: NotificationEmit) => void
    delete: (idContentChat: string, data: DeleteChat) => void
    recall: (idContentChat: string, idRoom: string, data: DeleteChat) => void
}

export interface ClientToServerEvents {
    notifyMessage: (data: ResUsersChat) => void
    message: (data: ContentChat) => void
    notifyDelete: (data: ContentChat) => void
    connect_server: (id: string) => void
    notify_error: (message: string) => void
    notification: (data: NotificationSchema) => void
}

export interface InterServerEvents {
    ping: () => void
}

export type SocketIo = Socket<
    ServerToClientEvents,
    ClientToServerEvents,
    InterServerEvents,
    UserNoPassword
>
