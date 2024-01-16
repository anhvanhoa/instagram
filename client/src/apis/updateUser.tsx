import { httpToken } from '~/config/httpAxios'
import { Msg } from '~/types'
import { UserUpdate } from '~/types/auth'

const updateUser = async (user: UserUpdate) => {
    const { data } = await httpToken.patch<Msg>('/user/update', user)
    return data
}

export default updateUser
