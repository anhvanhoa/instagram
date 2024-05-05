import { http } from '~/config/httpAxios'
import { User } from '~/types/auth'
import { Posts } from '~/types/posts'
interface PostsLike extends Posts {
    like: User
}
const getOnePosts = async (id: string) => {
    const res = await http.get<PostsLike>(`/posts/${id}`)
    return res.payload.data
}

export default getOnePosts
