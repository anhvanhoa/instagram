import { JwtPayload } from 'jsonwebtoken'
import { DocumentModel } from './models/types'
import { ObjectId } from 'mongoose'
export type Gender = 'nam' | 'nữ' | 'khác'
export interface User extends DocumentModel<User> {
    _id: string
    fbId: string
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
export interface Posts extends DocumentModel<Posts> {
    _id: string
    title: string
    likes: []
    comments: []
    author: ObjectId
    contents: []
}

export interface ResUser extends Omit<User, 'password'> {
    accessToken: string
}

export interface Code {
    _id: string
    email?: string
    numberPhone?: string
    otp: string
}

export interface Info {
    email?: string
    numberPhone?: string
    userName?: string
}

export interface LoginType extends Info {
    password: string
}

export interface UserFacebook {
    id: string
    displayName: string
    accessToken: string
    photos: array
}

export interface LoginFB {
    displayName: string
    email: string | null
    phoneNumber: string | null
    photoURL: string | null
    uid: string
}

export interface JwtyData extends JwtPayload {
    userName: string
}
