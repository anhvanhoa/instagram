import axios, { AxiosRequestConfig, AxiosError } from 'axios'
import manageToken from '~/utils/rfToken'

type MethodRequest = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
const httpInstance = axios.create({
    baseURL: `${import.meta.env.VITE_URL}/api`,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
})

class HttpError extends Error {
    httpStatus: number
    payload: any
    constructor({ httpStatus, payload }: { httpStatus: number; payload: any }) {
        super('Http Error')
        this.httpStatus = httpStatus
        this.payload = payload
    }
}
const httpRequest = async <Response = any>(
    method: MethodRequest = 'GET',
    url: string,
    options?: AxiosRequestConfig,
) => {
    try {
        const normalPath = url.startsWith('/') ? url : `/${url}`
        const crToken = manageToken().crTokenDecode()
        const response = await httpInstance.request<Response>({
            method,
            url: normalPath,
            withCredentials: true,
            data: options?.data,
            ...options,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${crToken}`,
                ...options?.headers,
            },
        })
        const result = {
            httpStatus: response.status,
            payload: response.data,
        }
        return result
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new HttpError({
                httpStatus: error.status || 500,
                payload: error.response?.data,
            })
        }
        throw error
    }
}

const http = {
    post<Response>(url: string, data: any, options?: AxiosRequestConfig) {
        return httpRequest<Response>('POST', url, {
            ...options,
            data,
        })
    },
    get<Response>(url: string, options?: AxiosRequestConfig) {
        return httpRequest<Response>('GET', url, options)
    },
    put<Response>(url: string, data: any, options?: AxiosRequestConfig) {
        return httpRequest<Response>('PUT', url, {
            ...options,
            data,
        })
    },
    patch<Response>(url: string, data: any, options?: AxiosRequestConfig) {
        return httpRequest<Response>('PATCH', url, {
            ...options,
            data,
        })
    },
    postForm<Response>(url: string, data: FormData, options?: AxiosRequestConfig) {
        return httpRequest<Response>('POST', url, {
            ...options,
            data,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    },
    delete<Response>(url: string, options?: AxiosRequestConfig) {
        return httpRequest<Response>('DELETE', url, {
            ...options,
        })
    },
}

export { http }

export default httpInstance
