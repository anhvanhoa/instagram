import { http } from '~/config/httpAxios'

const dislikePostRequest = async ({ idPosts }: { idPosts: string }) => {
    const { payload } = await http.patch('/posts/dislike', { idPosts })
    return payload
}

export default dislikePostRequest
