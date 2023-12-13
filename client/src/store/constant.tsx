import { User } from '~/types/auth'

export const initializeUser: User = {
    _id: '',
    email: '',
    numberPhone: '',
    accessToken: '',
    avatar: '',
    bio: '',
    birthday: '',
    fullName: '',
    gender: '',
    userName: '',
    verify: true,
    followers: [],
    following: [],
    stories: [],
    notifications: [],
    posts: [],
}
export type LOGIN = 'LOGIN'
export type LOGOUT = 'LOGOUT'
type Action = LOGIN | LOGOUT
export interface ActionType {
    payload: User
    type: Action
}
