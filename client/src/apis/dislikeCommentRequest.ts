import { http } from '~/config/httpAxios'

/**
 * retrun idComment
 */
const dislikeCommentRequest = async (commentId: string) => {
    const { payload } = await http.post<string>(`/posts/${commentId}/dislike-comment`, {})
    return payload.data
}

export default dislikeCommentRequest
