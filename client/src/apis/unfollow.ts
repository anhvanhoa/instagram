import { http } from '~/config/httpAxios'
import { ResponseMessage } from '~/types/response'

const unfollow = async (idFollow: string) => {
    const res = await http.post<ResponseMessage>('/user/unfollow', { idFollow })
    return res.httpStatus
}

export default unfollow
