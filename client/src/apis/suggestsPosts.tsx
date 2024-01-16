import { httpToken } from '~/config/httpAxios'
import { Posts } from '~/types/posts'

const suggestsPosts = async (limit?: number) => {
    const { data } = await httpToken.get<Posts[]>('/posts/suggests', {
        params: { limit },
    })
    return data
}

export default suggestsPosts
