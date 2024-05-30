import { ObjectId } from 'mongodb'
import { DocumentModel } from '~/models'

export interface LikeSchema extends DocumentModel<LikeSchema> {
    _id: ObjectId
    postId: ObjectId
    commentId: ObjectId
    user: ObjectId
    createdAt: string
    updatedAt: string
}
