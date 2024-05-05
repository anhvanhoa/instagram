import { http } from '~/config/httpAxios'

const follow = async (idFollow: string) => {
    const res = await http.post('/user/follow', { idFollow })
    return res.httpStatus
}

export default follow
