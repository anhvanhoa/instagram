export type Gender = 'nam' | 'nữ' | 'khác'

export interface ResLogin {
    accessToken: string
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
}
