import { DocumentModel } from '~/models'

export type Gender = 'nam' | 'nữ' | 'khác'
export interface User extends DocumentModel<User> {
    _id: string
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

export type UserNoPassword = Omit<User, 'password'>
