import { http } from '~/config/httpAxios'
import { ResponseMessage } from '~/types/response'
import { UserUpdate } from '~/types/auth'

const updateUser = async (user: UserUpdate) => {
    const { payload } = await http.patch<ResponseMessage>('/user/update', user)
    return payload
}

export default updateUser
