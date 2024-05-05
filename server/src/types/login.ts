import { ResponseMessage } from './common'
import { Info } from './register'
import { ResUser } from './user'

export interface LoginType extends Info {
    password: string
}

export interface LoginFB {
    displayName: string
    email: string | null
    phoneNumber: string | null
    photoURL: string | null
    uid: string
}

export interface ResponseLogin extends ResponseMessage {
    data: ResUser
}
