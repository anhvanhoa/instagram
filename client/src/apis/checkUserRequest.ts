import { http } from '~/config/httpAxios'

const checkUserRequest = async (userName: string) => {
    const { payload } = await http.get<{
        isAccount: boolean
    }>(`/user/${userName}/check`)
    return payload
}

export default checkUserRequest
