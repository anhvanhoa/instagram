import { http } from '~/config/httpAxios'
import { Posts } from '~/types/posts'

const suggestsPosts = async (limit: number = 20) => {
    const { payload } = await http.get<Posts[]>('/posts/suggests', {
        params: { limit },
    })
    return payload
}

export default suggestsPosts
