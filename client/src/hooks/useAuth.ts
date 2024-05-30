import { createContext, Dispatch, useContext } from 'react'
import { User } from '~/types/auth'
import manageToken from '~/utils/rfToken'

export const initializeAuth: User = {
    _id: '',
    email: '',
    numberPhone: '',
    accessToken: manageToken().crTokenDecode() || '',
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

interface ContextType {
    user: User
    setUser: Dispatch<User>
}
export const ContextAuth = createContext<ContextType>({
    user: initializeAuth,
    setUser: () => {},
})

const useAuth = () => {
    const { user, setUser } = useContext(ContextAuth)
    const handleSetUser = (user: User) => {
        manageToken().crTokenEncode(user.accessToken)
        setUser(user)
    }
    return { user, setUser: handleSetUser }
}

export default useAuth
