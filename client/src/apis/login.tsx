import http from '~/config/httpAxios'
import { LoginData, User } from '~/types/auth'
interface ResUser extends User {
    refreshToken: string
}
const login = async (data: LoginData) => {
    const res = await http.post<ResUser>('/auth/login', data)
    return res.data
}

export default login
