// import { ResponsePost } from './posts'

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
export type Gender = 'male' | 'female' | 'other'
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
    verify: boolean
    accessToken: string
    website: string
    totalFollowers: number
    totalFollowing: number
    totalPost: number
}

export type UserBase = {
    avatar: string
    userName: string
    fullName: string
    verify: boolean
    _id: string
}

export type UserBaseFollow = UserBase & {
    isFollowing: boolean
}

export interface UserUpdate {
    gender: Gender
    fullName: string
    avatar: string
    birthday: string
    bio: string
    website: string
}

export type ResponseUsers = {
    users: UserBaseFollow[]
    count: number
}
