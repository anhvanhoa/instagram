import { httpToken } from '~/config/httpAxios'
import { Msg } from '~/types'

const unfollow = async (idFollow: string) => {
    const res = await httpToken.post<Msg>('/user/unfollow', { idFollow })
    return res.status
}

export default unfollow
