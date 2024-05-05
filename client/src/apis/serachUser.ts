import { http } from '~/config/httpAxios'
import { User } from '~/types/auth'

const serachUser = async (q: string) => {
    const { payload } = await http.get<User[]>('/user/search', {
        params: {
            q,
        },
    })

    return payload.data
}

export default serachUser
