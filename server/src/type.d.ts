import { User } from '~/types/user'
declare module 'express' {
    interface Request {
        user?: Omit<User, 'password'>
        cookies: { [key: string]: string | undefined; refreshToken?: string }
    }
}
