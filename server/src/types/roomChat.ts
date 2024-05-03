import { ObjectId } from 'mongoose'
import { DocumentModel } from '~/models'

export interface RoomChat extends DocumentModel<RoomChat> {
    _id: string
    members: ObjectId[]
}
