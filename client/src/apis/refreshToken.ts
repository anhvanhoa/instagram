import { http } from '~/config/httpAxios'
import { ResFreshToken } from '~/types/refreshToken'

const refreshToken = async (signal?: AbortSignal) => {
    const { payload } = await http.post<ResFreshToken>(
        '/auth/refresh',
        {},
        {
            signal,
        },
    )
    return payload.data
}

export default refreshToken
