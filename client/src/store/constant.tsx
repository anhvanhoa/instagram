import { User } from '~/types/auth'
import manageToken from '~/utils/rfToken'

export const initializeUser: User = {
    _id: '',
    email: '',
    numberPhone: '',
    accessToken: manageToken().crTokenDecode() || '',
    avatar: '',
    bio: '',
    birthday: '',
    fullName: '',
    gender: 'khác',
    userName: '',
    verify: false,
    followers: [],
    following: [],
    stories: [],
    notifications: [],
    posts: [],
}
export type LOGIN = 'LOGIN'
export type LOGOUT = 'LOGOUT'
export type UPDATE = 'UPDATE'
type Action = LOGIN | LOGOUT | UPDATE
export interface ActionType {
    payload: User
    type: Action
}
