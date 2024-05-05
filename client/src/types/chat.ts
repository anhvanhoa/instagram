import { User } from './auth'

export interface ContentChat {
    _id: string
    idBoxChat: string
    idUser: string
    message: string
    image: string
    isDeleteSend: boolean
    isDeleteReceive: boolean
    isSeen: boolean
    createdAt: string
}

export interface DetailChat {
    message: string
    type: string
}
export interface SeenChat {
    idUser: string
    idContentChat: string
}

export interface DeleteChat {
    isDeleteReceive?: boolean
    isDeleteSend?: boolean
}

export interface Notification {
    _id: string
    fromUser: User
    toUser: User
    idPosts: string
    content: string
    createdAt: string
}

export interface NotificationEmit {
    fromUser: string
    toUser: string
    idPosts: string
}

export interface ClientToServerEvents {
    joinRoom: (idUser: string) => void
    leaveRoom: (idUser: string) => void
    chat: (room: string, data: DetailChat) => void
    seen: (idContentChat: string) => void
    like: (data: NotificationEmit) => void
    comment: (data: NotificationEmit) => void
    delete: (idContentChat: string, data: DeleteChat) => void
    recall: (idContentChat: string, idRoom: string, data: DeleteChat) => void
}

export interface ServerToClientEvents {
    message: (data: ContentChat) => void
    notifyMessage: (data: UserChat) => void
    connect_server: (id: string) => void
    notify_error: (message: string) => void
    notifyDelete: (data: ContentChat) => void
    notification: (data: Notification) => void
    like: (data: string) => void
}

export interface UserChat extends User {
    message: ContentChat | null
    idRoom: string
}
