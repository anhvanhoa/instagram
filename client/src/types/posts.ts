import { CroppedRect, Position } from 'react-avatar-editor'
import { User } from './auth'
export interface Comment {
    _id: string
    content: string
    userId: User
}
export interface Posts {
    _id: string
    title: string
    likes: []
    comments: Comment[]
    author: User
    contents: string[]
    createdAt: string
    typeAspect: string
}

export interface TypeImgCrop {
    fileCrop: File
    aspect: string
    clientSize: Position
    serverSize: CroppedRect
}
