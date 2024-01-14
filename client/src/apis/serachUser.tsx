import { httpToken } from '~/config/httpAxios'
import { User } from '~/types/auth'

const serachUser = async (q: string) => {
    const { data } = await httpToken.get<User[]>('/user/search', {
        params: {
            q,
        },
        withCredentials: true,
    })

    return data
}

export default serachUser
