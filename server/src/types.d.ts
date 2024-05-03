import { JwtPayload } from 'jsonwebtoken'
import { ObjectId } from 'mongoose'
import { Socket } from 'socket.io'
import { Info } from './types/register'
import { DocumentModel } from '~/models'
import { User, UserNoPassword } from '~/types/user'
import { ContentChat, ResUsersChat } from './types/chat'
import { NotificationSchema } from './types/notification'

export interface Comment extends DocumentModel<Comment> {
    _id: string
    content: string
    userId: ObjectId
}
export interface Post extends DocumentModel<Post> {
    _id: string
    title: string
    likes: []
    comments: ObjectId[]
    author: ObjectId
    contents: []
    isDelete: boolean
}
export interface Token extends DocumentModel<Posts> {
    _id: string
    idUser: string
    token: string
}

export interface ResUser extends Omit<User, 'password'> {
    accessToken: string
    refreshToken: string
}

export interface Code {
    _id: string
    email?: string
    numberPhone?: string
    otp: string
}

// export interface ContentChatIO extends ContentChat {
//     idUserChat: string
// }
export interface DetailChat {
    message: string
    type: string
}

export interface LoginType extends Info {
    password: string
}

export interface UserFacebook {
    id: string
    displayName: string
    accessToken: string
    photos: array
}

export interface LoginFB {
    displayName: string
    email: string | null
    phoneNumber: string | null
    photoURL: string | null
    uid: string
}

export interface JwtData extends JwtPayload {
    userName: string
}

export interface SizeCrop {
    height: number
    width: number
    x: number
    y: number
}

export interface UserChat extends User {
    chat: ContentChat
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

declare module 'express' {
    interface Request {
        user?: Omit<User, 'password'>
        cookies: { [key: string]: string | undefined; refreshToken?: string }
    }
}
