import { http } from '~/config/httpAxios'

const dislikePostRequest = async ({ postId }: { postId: string }) => {
    const { payload } = await http.patch('/posts/dislike', { postId })
    return payload
}

export default dislikePostRequest
