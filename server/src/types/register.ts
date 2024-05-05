export type Register = {
    userName: string
    password: string
    birthday: string
    email?: string
    numberPhone?: string
    fullName: string
}

export interface Info {
    email?: string
    numberPhone?: string
    userName?: string
}

export type InfoType = 'userName' | 'email' | 'tell'

export interface ResInfo {
    type: InfoType
    unique: boolean
}

export type ResponseRegister = {
    userName: string
}
