import { httpToken } from '~/config/httpAxios'
import { Msg } from '~/types'

const follow = async (idFollow: string) => {
    const res = await httpToken.post<Msg>('/user/follow', { idFollow })
    return res.status
}

export default follow
