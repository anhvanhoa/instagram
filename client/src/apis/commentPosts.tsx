import { httpToken } from '~/config/httpAxios'

const commentPosts = async ({ idPosts, content }: { idPosts: string; content: string }) => {
    const { data } = await httpToken.post(
        '/posts/comment',
        { idPosts, content },
        {
            withCredentials: true,
        },
    )
    return data
}

export default commentPosts
