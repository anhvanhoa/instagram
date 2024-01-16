import { AES, enc } from 'crypto-js'
function rfToken() {
    const rfToken = localStorage.getItem('rf_token')
    const key = import.meta.env.VITE_KEY_TOKEN
    return {
        rfTokenEncode: (token: string) => {
            const encodeToken = AES.encrypt(token, key).toString()
            localStorage.setItem('rf_token', encodeToken)
        },
        rfTokenDecode: () => {
            if (!rfToken) return false
            return AES.decrypt(rfToken, key).toString(enc.Utf8)
        },
        rfTokenRemove: () => localStorage.removeItem('rf_token'),
    }
}

export default rfToken
