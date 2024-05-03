import { http } from '~/config/httpAxios'
import { User } from '~/types/auth'

const profile = async () => {
    const { payload } = await http.get<User>(`/user/profile`)
    return payload
}

export default profile
