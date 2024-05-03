import { http } from '~/config/httpAxios'
import { LoginData } from '~/types/auth'
import { ResLogin } from '~/types/login'

const login = async (data: LoginData) => {
    const res = await http.post<ResLogin>('/auth/login', data)
    return res.payload
}

export default login
