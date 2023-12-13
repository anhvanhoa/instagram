export interface DataRegister {
    email: string
    numberPhone: string
    fullName: string
    userName: string
    password: string
    birthday: string
    otp: string
}

export interface BirthdayType {
    day: number
    month: number
    year: number
}

export interface UniqueUser {
    email?: string
    numberPhone?: string
    userName?: string
}

export interface LoginData {
    emailTellName: string
    email: string | null
    numberPhone: string | null
    userName: string | null
    password: string
}
type Gender = 'nam' | 'nữ' | 'khác' | ''
export interface User {
    _id: string
    gender: Gender
    userName: string
    fullName: string
    email: string
    avatar: string
    numberPhone: string
    birthday: string
    bio: string
    posts: []
    followers: []
    following: []
    stories: []
    verify: boolean
    notifications: []
    accessToken: string
}
