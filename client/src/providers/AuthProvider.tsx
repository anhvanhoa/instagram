import { useMutation } from '@tanstack/react-query'
import { ReactNode, useEffect, useState } from 'react'
import refreshToken from '~/apis/refreshToken'
import { ContextAuth, initializeAuth } from '~/hooks/useAuth'
import manageToken from '~/utils/rfToken'
const Timer = 1000 * 30
const ProviderAuth: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState(initializeAuth)
    const { mutate } = useMutation({
        mutationKey: ['refreshToken'],
        mutationFn: (data: { signal?: AbortSignal }) => refreshToken(data.signal),
        onSuccess: (data) => {
            Object.assign(user, data)
            manageToken().crTokenEncode(data.accessToken)
        },
        onError: () => {
            manageToken().crTokenRemove()
            Object.assign(user, initializeAuth)
        },
    })
    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal
        const crToken = manageToken().crTokenDecode()
        crToken && mutate({ signal })
        const idTimer = setInterval(() => {
            crToken && mutate({ signal })
        }, Timer)
        return () => {
            controller.abort()
            clearInterval(idTimer)
        }
    }, [mutate])
    return (
        <ContextAuth.Provider value={{ user, setUser }}>{children}</ContextAuth.Provider>
    )
}

export default ProviderAuth
