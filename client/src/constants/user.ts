import { TypeUser } from '~/apis/getUser'
import { User } from '~/types/auth'

export const notAvatarServer = 'avatar-empty.png'

export const initializeUser: User = {
    _id: '',
    email: '',
    numberPhone: '',
    accessToken: '',
    avatar: '',
    bio: '',
    birthday: '',
    fullName: '',
    gender: 'other',
    userName: '',
    verify: false,
    website: '',
    totalFollowers: 0,
    totalFollowing: 0,
    totalPost: 0,
}

export const initUserFollow: TypeUser = {
    user: {
        ...initializeUser,
        totalFollowers: 0,
        totalFollowing: 0,
        totalPost: 0,
    },
    additional: {
        isFollowing: false,
        isFriend: false,
        isFollower: false,
        isBlock: false,
        blockByUser: false,
    },
}
