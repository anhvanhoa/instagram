import { http } from '~/config/httpAxios'
import { ResponseUsers } from '~/types/auth'

const followingRequest = async (username: string) => {
    const res = await http.get<ResponseUsers>(`/user/${username}/following`)
    return res.payload.data
}

export default followingRequest
