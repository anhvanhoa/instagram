import { JwtPayload } from 'jsonwebtoken'
import { DocumentModel } from './models/types'
import { ObjectId } from 'mongoose'
export type Gender = 'nam' | 'nữ' | 'khác'
export interface User extends DocumentModel<User> {
    _id: string
    fbId: string
    gender: Gender
    userName: string
    fullName: string
    email: string
    avatar: string
    numberPhone: string
    birthday: string
    password: string
    bio: string
    posts: []
    followers: []
    following: []
    stories: []
    verify: boolean
    notifications: []
}

export interface Comment extends DocumentModel<Comment> {
    _id: string
    content: string
    userId: ObjectId
}
export interface Posts extends DocumentModel<Posts> {
    _id: string
    title: string
    likes: []
    comments: ObjectId[]
    author: ObjectId
    contents: []
    typeAspect: string
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
export interface RoomChat {
    _id: string
    notification: boolean
    name: string
    members: {
        idUser: string
        joinTime: Date
        outTime: Date
        isOut: boolean
    }[]
}
export interface BoxChat {
    _id: string
    idRoom: ObjectId
    idUser: ObjectId
    idUserChat: ObjectId
    nickname: string
    contentChat: ContentChat[]
    isDelete: boolean
}
export interface ContentChat extends DocumentModel<ContentChat> {
    _id: string
    idBoxChat: ObjectId
    idUser: ObjectId | string
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

export interface Info {
    email?: string
    numberPhone?: string
    userName?: string
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

export interface SeenChat {
    idUser: string
    idContentChat: string
}
export interface DeleteChat extends SeenChat {
    idUserisDeleteReceive: boolean
    isDeleteSend: boolean
}

export interface Notification extends DocumentModel<Notification> {
    _id: string
    fromUser: ObjectId
    toUser: ObjectId
    idPosts: ObjectId
    content: string
    createdAt: string
}
export interface NotificationEmit {
    fromUser: string
    toUser: string
    idPosts: string
}

export interface ServerToClientEvents {
    joinRoom: (idUser: string) => void
    leaveRoom: (idUser: string) => void
    chat: (data: DetailChat) => void
    seen: (data: SeenChat) => void
    like: (data: NotificationEmit) => void
    comment: (data: NotificationEmit) => void
    delete: (data: DeleteChat) => void
}

export interface ClientToServerEvents {
    sendMessage: (data: ContentChatIO) => void
    notifyMessage: (data: UserChat) => void
    notifyDelete: (data: UserChat) => void
    newMessage: (data: DetailChat) => void
    connect_server: (id: string) => void
    notify_error: (message: string) => void
    notification: (data: Notification) => void
}

export interface InterServerEvents {
    ping: () => void
}

interface SocketData {
    userName: string
}

export interface UserChat extends User {
    chat: ContentChat
}
