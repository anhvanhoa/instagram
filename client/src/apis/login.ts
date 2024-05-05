import { http } from '~/config/httpAxios'
import { LoginData, User } from '~/types/auth'

const login = async (data: LoginData) => {
    const res = await http.post<User>('/auth/login', data)
    return res.payload.data
}

export default login
