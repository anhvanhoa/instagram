import { httpToken } from '~/config/httpAxios'
import { User } from '~/types/auth'

const getUser = async (username: string) => {
    const { data } = await httpToken.get<User>(`/user/${username}`)
    return data
}

export default getUser
