import { http } from '~/config/httpAxios'
import { User, UserUpdate } from '~/types/auth'

const updateUser = async (user: UserUpdate) => {
    const { payload } = await http.patch<User>('/user/update', user)
    return payload.data
}

export default updateUser
