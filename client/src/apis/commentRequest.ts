import { http } from '~/config/httpAxios'

const commentRequest = async ({ idPosts, content }: { idPosts: string; content: string }) => {
    const { payload } = await http.post('/posts/comment', { idPosts, content })
    return payload
}

export default commentRequest
