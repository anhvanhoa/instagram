import http from '~/config/httpAxios'
import { Msg } from '~/types'
import { DataRegister } from '~/types/auth'
const register = async (data: DataRegister) => {
    const res = await http.post<Msg>('/auth/register', data)
    return res.status
}

export default register
