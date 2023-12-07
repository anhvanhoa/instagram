import { PhoneAuthProvider, RecaptchaVerifier, signInWithCredential, signInWithPhoneNumber } from 'firebase/auth'
import { auth } from '~/config/firebase'

const firebaseOtp = () => {
    return {
        sendOtpFirebase: async (tell: string, idVerify: string) => {
            const verify = new RecaptchaVerifier(auth, idVerify, {
                size: 'invisible',
            })
            const confirmationResult = await signInWithPhoneNumber(auth, `+84${tell}`, verify)
            return confirmationResult.verificationId
        },
        verifyOtp: async (code: string, verificationId: string) => {
            const credential = PhoneAuthProvider.credential(verificationId, code)
            await signInWithCredential(auth, credential)
        },
    }
}

export default firebaseOtp
