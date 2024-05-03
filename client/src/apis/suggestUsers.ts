import { http } from '~/config/httpAxios'
import { User } from '~/types/auth'

const suggestUsers = async (limit: number = 5) => {
    const res = await http.get<User[]>('/user/suggest', {
        params: {
            limit,
        },
    })
    return res.payload
}
export default suggestUsers
