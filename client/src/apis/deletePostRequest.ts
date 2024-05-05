import { http } from '~/config/httpAxios'

const deletePostRequest = async (id: string) => {
    const { payload } = await http.delete(`/posts/delete/${id}`)
    return payload
}

export default deletePostRequest
