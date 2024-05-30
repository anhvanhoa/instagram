import { http } from '~/config/httpAxios'
import { ResponseUsers } from '~/types/auth'

const followersRequest = async (username: string) => {
    const res = await http.get<ResponseUsers>(`/user/${username}/followers`)
    return res.payload.data
}

export default followersRequest
