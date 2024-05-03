import { http } from '~/config/httpAxios'
import { Msg } from '~/types'
import { UserUpdate } from '~/types/auth'

const updateUser = async (user: UserUpdate) => {
    const { payload } = await http.patch<Msg>('/user/update', user)
    return payload
}

export default updateUser
