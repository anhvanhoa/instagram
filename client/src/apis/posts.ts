import { http } from '~/config/httpAxios'
import { ResponsePost } from '~/types/posts'

const getPosts = async () => {
    const res = await http.get<ResponsePost[]>('/posts')
    return res.payload.data
}

export default getPosts
