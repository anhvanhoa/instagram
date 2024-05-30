import { ObjectId } from 'mongoose'
import { DocumentModel } from '~/models'
import { UserBase } from './post'

export type Gender = 'male' | 'female' | 'other' | ''
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
    verify: boolean
    website: string
}

export type UserNoPassword = Omit<User, 'password'>

export interface ResUser extends Omit<User, 'password'> {
    accessToken: string
    totalPost: number
    totalFollowers: number
    totalFollowing: number
}

export interface UserFollowersSchema extends DocumentModel<UserFollowersSchema> {
    _id: ObjectId
    user: ObjectId
    followers: ObjectId
    createdAt: Date
    updatedAt: Date
}
export interface BlockSchema extends DocumentModel<BlockSchema> {
    _id: ObjectId
    user: ObjectId
    userBlock: ObjectId
    createdAt: Date
    updatedAt: Date
}

export interface FollowersOrFollowingToSchema extends Pick<UserFollowersSchema, '_id'> {
    user: DocumentModel<UserBase>
    followers: DocumentModel<UserBase>
}
