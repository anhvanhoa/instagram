import { http } from '~/config/httpAxios'
import { ResponseMessage } from '~/types/response'
import { UniqueUser } from '~/types/auth'

export type SendOTP = Omit<UniqueUser, 'userName'>
const sendOtp = async (data: SendOTP) => {
    const res = await http.post<ResponseMessage>('/auth/sign-otp', data)
    return res.httpStatus
}

export default sendOtp
