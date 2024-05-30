import { http } from '~/config/httpAxios'

const showManyFollow = async (ids: string[]) => {
    const res = await http.post<{ [key: string]: { isFollowing: boolean } }>(
        '/user/follow/show-many',
        ids,
    )
    return res.payload.data
}

export default showManyFollow
