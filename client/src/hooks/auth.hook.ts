import { useMutation } from '@tanstack/react-query'
import logout from '~/apis/logout'
import manageToken from '~/utils/rfToken'
import useAuth from './useAuth'
import { useNavigate } from 'react-router-dom'
import { initializeUser } from '~/constants/user'

const useLogout = () => {
    const { setUser } = useAuth()
    const navigate = useNavigate()
    const handleSuccess = () => {
        manageToken().crTokenRemove()
        navigate('/')
        setUser({
            ...initializeUser,
            accessToken: '',
        })
        console.log('logout success')
    }
    return useMutation({
        mutationKey: ['logout'],
        mutationFn: (time: string) => logout(time),
        onSuccess: handleSuccess,
    })
}

export { useLogout }
