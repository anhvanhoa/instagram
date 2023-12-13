import http from '~/config/httpAxios'
import { Msg } from '~/types'
import { DataRegister } from '~/types/auth'
const firebaseRegister = async (data: DataRegister) => {
    const res = await http.post<Msg>('/auth/firebase-register', data)
    return res.status
}

export default firebaseRegister
