import http from '~/config/httpAxios'
import { User } from '~/types/auth'

const refreshJwt = async () => {
    const res = await http.get<Pick<User, 'accessToken'>>('auth/refresh', {
        withCredentials: true,
    })
    return res.data
}

export default refreshJwt
