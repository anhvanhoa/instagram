import { FacebookAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '~/config/firebase'
const registerFacebook = async () => {
    const provider = new FacebookAuthProvider()
    const res = await signInWithPopup(auth, provider)
    console.log(res)
}

export default registerFacebook
