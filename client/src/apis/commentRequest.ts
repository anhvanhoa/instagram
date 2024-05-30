import { http } from '~/config/httpAxios'
import { Comment, CommentCreate } from '~/types/posts'

const commentRequest = async ({ parentId, content, postId }: CommentCreate) => {
    const { payload } = await http.post<Comment>(`/posts/${postId}/comment`, {
        parentId,
        content,
    })
    return payload.data
}

export default commentRequest
