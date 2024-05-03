import { ObjectId } from 'mongoose'
import { ContentChat } from './chat'
import { DocumentModel } from '~/models'

export interface BoxChat extends DocumentModel<BoxChat> {
    _id: string
    idRoom: ObjectId
    idUser: ObjectId
    idUserChat: ObjectId
    nickname: string
    contentChat: ContentChat[]
    isDelete: boolean
}
