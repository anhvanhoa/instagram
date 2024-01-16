import { httpToken } from '~/config/httpAxios'

const dislikePosts = async ({ idPosts }: { idPosts: string }) => {
    const { data } = await httpToken.patch('/posts/dislike', { idPosts })
    return data
}

export default dislikePosts
