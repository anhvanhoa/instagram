import http from '~/config/httpAxios'
import { Msg } from '~/types'
import { UniqueUser } from '~/types/auth'

export type SendOTP = Omit<UniqueUser, 'userName'>
const sendOtp = async (data: SendOTP) => {
    const res = await http.post<Msg>('/auth/sign-otp', data)
    return res.status
}

export default sendOtp
