import { http } from '~/config/httpAxios'
import { Comment } from '~/types/posts'

const commentsChildrenRequest = async (parentId: string) => {
    const { payload } = await http.get<Comment[]>(`/posts/${parentId}/comment-children`)
    return payload.data
}

export default commentsChildrenRequest
