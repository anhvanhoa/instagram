import { http } from '~/config/httpAxios'
import { ResponsePost } from '~/types/posts'

const commentDisablePost = async ({
    postId,
    commentDisable,
}: {
    postId: string
    commentDisable: boolean
}) => {
    const { payload } = await http.post<ResponsePost>(
        `/posts/${postId}/comment-disable`,
        {
            commentDisable,
        },
    )
    return payload.data
}

export default commentDisablePost
