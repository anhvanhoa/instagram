import { httpToken } from '~/config/httpAxios'
import { Posts } from '~/types/posts'

const getOnePosts = async (id: string) => {
    const res = await httpToken.get<Posts>(`/posts/${id}`, {
        withCredentials: true,
    })
    return res.data
}

export default getOnePosts
