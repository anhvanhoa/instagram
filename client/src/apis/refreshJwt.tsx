import http from '~/config/httpAxios'
interface Token {
    accessToken: string
    refreshToken: string
}
const refreshJwt = async (token: string) => {
    const res = await http.post<Token>('auth/refresh', { tokenRefresh: token })
    return res
}

export default refreshJwt
