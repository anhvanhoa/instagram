import { ObjectId } from 'mongoose'
import { DocumentModel } from '~/models'
import { CommentUserIdToSchema } from './comment'

export type UserBase = {
    avatar: string
    userName: string
    fullName: string
    _id: string
    verify: boolean
}

export interface Post {
    _id: ObjectId
    title: string
    likes: ObjectId[]
    author: ObjectId
    media: Media[]
}

type Media = {
    type: 'image' | 'video'
    ratio: '1' | '4/5' | '16/9'
    content: string
}

export interface PostSchema extends DocumentModel<PostSchema> {
    _id: ObjectId
    title: string
    author: ObjectId
    media: Media[]
    commentDisable: boolean
    countLikeDisable: boolean
    createdAt: string
    updatedAt: string
}

export interface PostAuthor extends Omit<PostSchema, 'author'> {
    author: UserBase
}

export type ResponsePost = {
    likeTotal: number
    commentTotal: number
    likes: UserBase[]
    comments: CommentUserIdToSchema[]
    isLike: boolean
    author: UserBase
    commentDisable: boolean
    countLikeDisable: boolean
} & Omit<Post, 'likes' | 'comments' | 'author'>
