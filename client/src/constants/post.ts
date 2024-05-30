import { ResponsePost } from '~/types/posts'

export const initPost: ResponsePost = {
    _id: '',
    author: {
        _id: '',
        avatar: '',
        fullName: '',
        userName: '',
        verify: false,
    },
    comments: [],
    createdAt: '',
    isLike: false,
    likes: [],
    title: '',
    commentTotal: 0,
    likeTotal: 0,
    media: [],
    commentDisable: false,
    countLikeDisable: false,
}
