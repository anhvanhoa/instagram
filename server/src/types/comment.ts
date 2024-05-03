import { ObjectId } from 'mongoose'
import { DocumentModel } from '~/models'

export interface Comment extends DocumentModel<Comment> {
    _id: string
    content: string
    userId: ObjectId
}
