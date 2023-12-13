import http from '~/config/httpAxios'
import { LoginData, User } from '~/types/auth'

const login = async (data: LoginData) => {
    const res = await http.post<User>('/auth/login', data, {
        withCredentials: true,
    })
    return res.data
}

export default login
