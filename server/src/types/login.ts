import { Info } from './register'

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
