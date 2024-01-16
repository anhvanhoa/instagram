import { httpToken } from '~/config/httpAxios'
import { Msg } from '~/types'
import { auth } from '~/config/firebase'
import { signOut } from 'firebase/auth'

const logout = async () => {
    signOut(auth).then(() => {
        console.log('thanh cong')
    })
    const res = await httpToken.post<Msg>('/auth/logout')
    return res.data
}

export default logout
