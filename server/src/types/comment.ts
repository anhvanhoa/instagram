import { ObjectId } from 'mongoose'
import { DocumentModel } from '~/models'
import { UserBase } from './post'

export interface CommentSchema extends DocumentModel<CommentSchema> {
    _id: string
    postId: ObjectId
    parentId: ObjectId
    content: string
    user: ObjectId
    isDelete: boolean
}

export interface CommentUserIdToSchema
    extends Pick<CommentSchema, '_id' | 'content' | 'isDelete'> {
    _doc: CommentUserIdToSchema
    parentId: string
    user: UserBase
    postId: string
    isDelete: boolean
}

export interface PostsCreate {
    content: string
    parentId?: string
}

export type ResponseComment = Omit<CommentUserIdToSchema, '_doc'> & {
    countChildren: number
    countLike: number
    isLike: boolean
    user: UserBase
    replies: ResponseComment[]
}
