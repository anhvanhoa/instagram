import http from '~/config/httpAxios'
import { Msg } from '~/types'
import { DataRegister } from '~/types/register'
const register = async (data: DataRegister) => {
    const res = await http.post<Msg>('/auth/register', data)
    return res.status
}

export default register
