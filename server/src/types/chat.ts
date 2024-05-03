import { DocumentModel } from '~/models'
import { UserNoPassword } from './user'
import { ObjectId } from 'mongodb'
export interface ContentChat extends DocumentModel<ContentChat> {
    _id: string
    idBoxChat: ObjectId
    idUser: ObjectId | string
    message: string
    image: string
    isDeleteSend: boolean
    isDeleteReceive: boolean
    isSeen: boolean
    createdAt: Date
}
export interface ResUsersChat extends UserNoPassword {
    message: ContentChat | null
    idRoom: string
}
