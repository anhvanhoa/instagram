import { ObjectId } from 'mongoose'
import { DocumentModel } from '~/models'

export interface Post extends DocumentModel<Post> {
    _id: string
    title: string
    likes: []
    comments: ObjectId[]
    author: ObjectId
    contents: []
    isDelete: boolean
}
