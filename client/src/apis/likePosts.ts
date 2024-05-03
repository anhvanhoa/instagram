import { http } from '~/config/httpAxios'
import { Msg } from '~/types'

const likePosts = async ({ idPosts }: { idPosts: string }) => {
    const { payload } = await http.post<Msg>('/posts/like', { idPosts })
    return payload
}

export default likePosts
