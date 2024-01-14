import { httpToken } from '~/config/httpAxios'

const dislikePosts = async ({ idPosts }: { idPosts: string }) => {
    const { data } = await httpToken.patch(
        '/posts/dislike',
        { idPosts },
        {
            withCredentials: true,
        },
    )
    return data
}

export default dislikePosts
