import { http } from '~/config/httpAxios'
import { User } from '~/types/auth'

const getUser = async (username: string) => {
    const { payload } = await http.get<User>(`/user/${username}`)
    return payload
}

export default getUser
