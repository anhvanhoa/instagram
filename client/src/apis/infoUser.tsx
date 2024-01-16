import { httpToken } from '~/config/httpAxios'
import { User } from '~/types/auth'
interface UserInfo extends User {
    isFollowing: boolean
    isFollower: boolean
}
const infoUser = async (id: string) => {
    const { data } = await httpToken.get<UserInfo>(`/user/${id}/info`)
    return data
}

export default infoUser
