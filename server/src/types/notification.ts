import { ObjectId } from 'mongoose'
import { DocumentModel } from '~/models'

export interface NotificationSchema extends DocumentModel<NotificationSchema> {
    _id: string
    fromUser: ObjectId
    toUser: ObjectId
    idPosts: ObjectId
    content: string
    isNotification: boolean
    createdAt: string
}
