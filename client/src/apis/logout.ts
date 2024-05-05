import { http } from '~/config/httpAxios'
// import { auth } from '~/config/firebase'
// import { signOut } from 'firebase/auth'

const logout = async () => {
    // signOut(auth).then(() => {
    //     console.log('thanh cong')
    // })
    const { payload } = await http.post('/auth/logout', {})
    return payload
}

export default logout
