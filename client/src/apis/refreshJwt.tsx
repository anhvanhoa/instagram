import http from '~/config/httpAxios'
import rfToken from '~/utils/rfToken'
interface Token {
    accessToken: string
    refreshToken: string
}
const refreshJwt = async (token: string) => {
    const { rfTokenRemove, rfTokenEncode } = rfToken()
    const res = await http.post<Token>('auth/refresh', { tokenRefresh: token })
    localStorage.setItem('cr_token', res.data.accessToken)
    rfTokenEncode(res.data.refreshToken)
    if (res.status !== 200) {
        localStorage.removeItem('cr_token')
        rfTokenRemove()
        location.reload()
    }
    return res
}

export default refreshJwt
