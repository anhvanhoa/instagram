import { http } from '~/config/httpAxios'
import { ResponseMessage } from '~/types/response'
import { DataRegister } from '~/types/auth'
const registerRequest = async (data: DataRegister) => {
    const res = await http.post<ResponseMessage>('/auth/register', data)
    return res.httpStatus
}

export default registerRequest
