import { http } from '~/config/httpAxios'
import { Posts } from '~/types/posts'

const getPosts = async () => {
    const res = await http.get<Posts[]>('/posts')
    return res.payload
}

export default getPosts
