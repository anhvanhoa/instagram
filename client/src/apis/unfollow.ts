import { http } from '~/config/httpAxios'
import { Msg } from '~/types'

const unfollow = async (idFollow: string) => {
    const res = await http.post<Msg>('/user/unfollow', { idFollow })
    return res.httpStatus
}

export default unfollow
