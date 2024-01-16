import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import refreshJwt from '~/apis/refreshJwt'
import rfToken from '~/utils/rfToken'
const http = axios.create({
    baseURL: `${import.meta.env.VITE_URL}/api`,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
})
export const httpToken = axios.create({
    baseURL: `${import.meta.env.VITE_URL}/api`,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
})
httpToken.interceptors.request.use(async (response) => {
    const { rfTokenDecode, rfTokenRemove, rfTokenEncode } = rfToken()
    const crToken = localStorage.getItem('cr_token')
    const rf_token = rfTokenDecode()
    if (!crToken || !rf_token) {
        localStorage.removeItem('cr_token')
        rfTokenRemove()
        return response
    }
    const { exp } = jwtDecode(crToken)
    if (!exp) {
        localStorage.removeItem('cr_token')
        rfTokenRemove()
        return response
    }
    const date = new Date()
    if (exp < date.getTime() / 1000) {
        const {
            status,
            data: { accessToken, refreshToken },
        } = await refreshJwt(rf_token)
        response.headers.Authorization = `Bearer ${accessToken}`
        localStorage.setItem('cr_token', accessToken)
        rfTokenEncode(refreshToken)
        if (status !== 200 && status !== 429) {
            localStorage.removeItem('cr_token')
            rfTokenRemove()
        }
    } else {
        response.headers.Authorization = `Bearer ${crToken}`
    }
    return response
})

export default http
