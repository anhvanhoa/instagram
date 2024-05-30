import { CommentUserIdToSchema, ResponseComment } from '~/types/comment'

export const convertUserIdToUser = (
    dataT: CommentUserIdToSchema,
): Omit<ResponseComment, 'countChildren' | 'replies' | 'countLike' | 'isLike'> => {
    const { user, _doc, ...data } = dataT
    return {
        ...data,
        user: user,
    }
}
