/* eslint-disable @typescript-eslint/no-unused-vars */
import { BoxChat } from '~/types/boxChat'
import { ContentChat, ResUsersChat } from '~/types/chat'
import { Code } from '~/types/code'
import { Comment } from '~/types/comment'
import { SizeCrop } from '~/types/image'
import { LoginFB, LoginType } from '~/types/login'
import { NotificationSchema } from '~/types/notification'
import { Post } from '~/types/post'
import { Info, InfoType, Register, ResInfo } from '~/types/register'
import { RoomChat } from '~/types/roomChat'
import {
    ClientToServerEvents,
    DeleteChat,
    DetailChat,
    InterServerEvents,
    NotificationEmit,
    ServerToClientEvents,
    SocketIo,
} from '~/types/socket'
import { Token } from '~/types/token'
import { User, Gender, ResUser, UserNoPassword } from '~/types/user'
import { type Request, Express } from 'express'
declare module 'express' {
    interface Express {}
    interface Request {
        user?: Omit<User, 'password'>
        cookies: { [key: string]: string | undefined; refreshToken?: string }
    }
}
