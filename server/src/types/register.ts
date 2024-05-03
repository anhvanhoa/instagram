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
