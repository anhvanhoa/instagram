import { httpToken } from '~/config/httpAxios'
import { User } from '~/types/auth'

const profile = async (id: string) => {
    const { data } = await httpToken.get<User>(`/user/current/${id}`, {
        withCredentials: true,
    })
    return data
}

export default profile
