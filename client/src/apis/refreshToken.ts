import { http } from '~/config/httpAxios'
import { ResFreshToken } from '~/types/refreshToken'

const refreshToken = (signal?: AbortSignal) => {
    return http.post<ResFreshToken>(
        '/auth/refresh',
        {},
        {
            signal,
        },
    )
}

export default refreshToken
