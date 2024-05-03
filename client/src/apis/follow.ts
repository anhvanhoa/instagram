import { http } from '~/config/httpAxios'
import { Msg } from '~/types'

const follow = async (idFollow: string) => {
    const res = await http.post<Msg>('/user/follow', { idFollow })
    return res.httpStatus
}

export default follow
