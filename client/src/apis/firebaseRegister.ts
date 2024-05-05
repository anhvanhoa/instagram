import { http } from '~/config/httpAxios'
import { DataRegister } from '~/types/auth'
const firebaseRegister = async (data: DataRegister) => {
    const res = await http.post('/auth/firebase-register', data)
    return res.httpStatus
}

export default firebaseRegister
