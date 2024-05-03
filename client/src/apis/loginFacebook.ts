import http from '~/config/httpAxios'
import { User } from '~/types/auth'

interface LoginFB {
    displayName: string
    email: string | null
    phoneNumber: string | null
    photoURL: string | null
    uid: string
}
interface ResUser extends User {
    refreshToken: string
}
const loginFacebook = async (data: LoginFB) => {
    const res = await http.post<ResUser>('/auth/login-facebook', data)
    return res.data
}

export default loginFacebook
