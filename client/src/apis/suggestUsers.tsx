import { httpToken } from '~/config/httpAxios'
import { User } from '~/types/auth'

const suggestUsers = async (limit: number = 5) => {
    const res = await httpToken.get<User[]>('/user/suggest', {
        params: {
            limit,
        },
    })
    return res.data
}
export default suggestUsers
