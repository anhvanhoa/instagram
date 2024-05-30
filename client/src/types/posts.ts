import { CroppedRect, Position } from 'react-avatar-editor'
import { UserBase } from './auth'

export interface Comment {
    _id: string
    content: string
    user: UserBase
    createdAt: string
    parentId: string
    postId: string
    likes: []
    isLike: boolean
    countLike: number
    countChildren: number
    replies: Comment[]
}

export type Media = {
    type_media: 'image' | 'video'
    content: string
    ratio: string
}

export interface Posts {
    _id: string
    title: string
    likes: string[]
    comments: Comment[]
    author: UserBase
    media: Media[]
    createdAt: string
}

export interface TypeImgCrop {
    fileCrop: File
    aspect: string
    clientSize: Position
    serverSize: CroppedRect
}

export type ResponsePost = {
    likeTotal: number
    commentTotal: number
    isLike: boolean
    commentDisable: boolean
    countLikeDisable: boolean
} & Posts

export type CommentCreate = Pick<Comment, 'content' | 'postId'> & {
    parentId: string | null
}
