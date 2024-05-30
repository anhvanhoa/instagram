import { http } from '~/config/httpAxios'
import { ResponsePost } from '~/types/posts'

const suggestPosts = async (page: number, limit: number = 12) => {
    const { payload } = await http.get<ResponsePost[]>('/posts/suggests', {
        params: { limit, page },
    })
    return payload.data
}

export default suggestPosts
