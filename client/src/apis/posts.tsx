import { httpToken } from '~/config/httpAxios'
import { Posts } from '~/types/posts'

const getPosts = async () => {
    const res = await httpToken.get<Posts[]>('/posts')
    return res.data
}

export default getPosts
