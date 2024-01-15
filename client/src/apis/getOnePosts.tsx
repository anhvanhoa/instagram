import { httpToken } from '~/config/httpAxios'
import { User } from '~/types/auth'
import { Posts } from '~/types/posts'
interface PostsLike extends Posts {
    like: User
}
const getOnePosts = async (id: string) => {
    const res = await httpToken.get<PostsLike>(`/posts/${id}`, {
        withCredentials: true,
    })
    return res.data
}

export default getOnePosts
