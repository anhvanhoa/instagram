import { User } from './auth'
import { Posts } from './posts'

export interface ContentChat {
    _id: string
    idBoxChat: string
    idUser: string
    message: string
    image: string
    isDeleteSend: boolean
    isDeleteReceive: boolean
    isSeen: boolean
    createdAt: Date
}
export interface ContentChatIO extends ContentChat {
    idUserChat: string
}

export interface DetailChat {
    idUser: string
    idUserChat: string
    message: string
}
export interface SeenChat {
    idUser: string
    idContentChat: string
}

export interface DeleteChat extends SeenChat {
    idUserisDeleteReceive: boolean
    isDeleteSend: boolean
}

export interface Notification {
    _id: string
    fromUser: User
    toUser: User
    idPosts: Posts
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
    chat: (data: DetailChat) => void
    seen: (data: SeenChat) => void
    like: (data: NotificationEmit) => void
    comment: (data: NotificationEmit) => void
    delete: (data: DeleteChat) => void
}

export interface ServerToClientEvents {
    notifyMessage: (data: UserChat) => void
    sendMessage: (data: ContentChatIO) => void
    connect_server: (id: string) => void
    notify_error: (message: string) => void
    notifyDelete: (data: UserChat) => void
    notification: (data: Notification) => void
}

export interface UserChat extends User {
    chat: ContentChat
}
