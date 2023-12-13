import http from '~/config/httpAxios'
import { Msg } from '~/types'
import { auth } from '~/config/firebase'
import { signOut } from 'firebase/auth'

const logout = async (accessToken: string) => {
    signOut(auth).then(() => {
        console.log('thanh cong')
    })
    const res = await http.post<Msg>(
        '/auth/logout',
        {},
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
        },
    )
    return res.data
}

export default logout
