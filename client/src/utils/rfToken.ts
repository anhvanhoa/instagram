import { AES, enc } from 'crypto-js'
function manageToken() {
    const rfToken = localStorage.getItem('cr_token')
    const key = import.meta.env.VITE_KEY_TOKEN
    return {
        crTokenEncode: (token: string) => {
            const encodeToken = AES.encrypt(token, key).toString()
            localStorage.setItem('cr_token', encodeToken)
        },
        crTokenDecode: () => {
            try {
                if (!rfToken) return undefined
                const decodeToken = AES.decrypt(rfToken, key).toString(enc.Utf8)
                return decodeToken
            } catch (error) {
                return ''
            }
        },
        crTokenRemove: () => localStorage.removeItem('cr_token'),
    }
}

export default manageToken
