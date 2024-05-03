import { http } from '~/config/httpAxios'
import { User } from '~/types/auth'
interface UserInfo extends User {
    isFollowing: boolean
    isFollower: boolean
}
const infoUser = async (id: string) => {
    const { payload } = await http.get<UserInfo>(`/user/${id}/info`)
    return payload
}

export default infoUser
