import { http } from '~/config/httpAxios'
import { ResponsePost } from '~/types/posts'

const getPost = async (id: string) => {
    const res = await http.get<ResponsePost | string>(`/posts/${id}`)
    return res.payload.data
}

export default getPost
