import { http } from '~/config/httpAxios'
import { ResponseMessage } from '~/types/response'

const likePostRequest = async ({ idPosts }: { idPosts: string }) => {
    const { payload } = await http.post<ResponseMessage>('/posts/like', { idPosts })
    return payload
}

export default likePostRequest
