import { http } from '~/config/httpAxios'
import { ResponseUsers } from '~/types/auth'

const usersLikeRequest = async (id: string) => {
    const res = await http.get<ResponseUsers>(`/posts/${id}/likes`)
    return res.payload.data
}

export default usersLikeRequest
