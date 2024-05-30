import { http } from '~/config/httpAxios'
// import { auth } from '~/config/firebase'
// import { signOut } from 'firebase/auth'

const logout = async (time: string) => {
    // signOut(auth).then(() => {
    //     console.log('thanh cong')
    // })
    const { payload } = await http.post('/auth/logout', { time })
    return payload
}

export default logout
