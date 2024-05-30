import { http } from '~/config/httpAxios'
import { User } from '~/types/auth'

export type Additional = {
    isFollowing: boolean
    isFollower: boolean
    isFriend: boolean
    isBlock: boolean
    blockByUser: boolean
}

export type TypeUser = {
    user: User
    additional: Additional
}

const getUser = async (username: string) => {
    const { payload } = await http.get<TypeUser>(`/user/${username}`)
    return payload.data
}

export default getUser
