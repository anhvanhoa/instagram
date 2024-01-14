import { httpToken } from '~/config/httpAxios'
import { Msg } from '~/types'

const likePosts = async ({ idPosts }: { idPosts: string }) => {
    const { data } = await httpToken.post<Msg>(
        '/posts/like',
        { idPosts },
        {
            withCredentials: true,
        },
    )
    return data
}

export default likePosts