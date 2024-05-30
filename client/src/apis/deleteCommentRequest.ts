import { http } from '~/config/httpAxios'

const deleteCommentRequest = async (idComment: string) => {
    const { payload } = await http.delete<string>(`/posts/${idComment}/comment`)
    return payload.data
}

export default deleteCommentRequest
