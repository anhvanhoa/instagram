import { FacebookAuthProvider, signInWithPopup } from 'firebase/auth'
import { getAuth } from 'firebase/auth'
import loginFacebook from './loginFacebook'
const registerFacebook = async () => {
    const auth = getAuth()
    const provider = new FacebookAuthProvider()
    const { user } = await signInWithPopup(auth, provider)
    const data = {
        displayName: user.displayName || 'Người dùng Facebook',
        email: user.email,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
        uid: user.uid,
    }
    return await loginFacebook(data)
}

export default registerFacebook
