import http from '~/config/httpAxios'
import { User } from '~/types/auth'

interface LoginFB {
    displayName: string
    email: string | null
    phoneNumber: string | null
    photoURL: string | null
    uid: string
}
const loginFacebook = async (data: LoginFB) => {
    const res = await http.post<User>('/auth/login-facebook', data, {
        withCredentials: true,
    })
    return res.data
}

export default loginFacebook
