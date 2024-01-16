import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import refreshJwt from '~/apis/refreshJwt'
const http = axios.create({
    baseURL: `${import.meta.env.VITE_URL}/api`,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})
export const httpToken = axios.create({
    baseURL: `${import.meta.env.VITE_URL}/api`,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})
httpToken.interceptors.request.use(async (response) => {
    const crToken = localStorage.getItem('cr_token')
    if (!crToken) {
        localStorage.removeItem('cr_token')
        return response
    }
    const { exp } = jwtDecode(crToken)
    if (!exp) {
        localStorage.removeItem('cr_token')
        return response
    }
    const date = new Date()
    if (exp < date.getTime() / 1000) {
        try {
            const { accessToken } = await refreshJwt()
            response.headers.Authorization = `Bearer ${accessToken}`
            localStorage.setItem('cr_token', accessToken)
        } catch (error) {
            localStorage.removeItem('cr_token')
        }
    } else {
        response.headers.Authorization = `Bearer ${crToken}`
    }
    return response
})

export default http
