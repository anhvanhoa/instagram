import { http } from '~/config/httpAxios'
import { ResponseMessage } from '~/types/response'

const likePostRequest = async ({ postId }: { postId: string }) => {
    const { payload } = await http.post<ResponseMessage>('/posts/like', { postId })
    return payload
}

export default likePostRequest
