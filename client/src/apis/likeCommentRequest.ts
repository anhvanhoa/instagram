import { http } from '~/config/httpAxios'

/**
 * retrun idComment
 */
const likeCommentRequest = async (commentId: string) => {
    const { payload } = await http.post<string>(`/posts/${commentId}/like-comment`, {})
    return payload.data
}

export default likeCommentRequest
