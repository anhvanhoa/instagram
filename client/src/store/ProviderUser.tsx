import React, { useEffect, useReducer } from 'react'
import reducer from './reducer'
import { initializeUser } from './constant'
import { contextUser } from './context'
import refreshToken from '~/apis/refreshToken'
import { useMutation } from '@tanstack/react-query'
import manageToken from '~/utils/rfToken'

const ProviderUser: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, dispatch] = useReducer(reducer, initializeUser)
    const { mutate } = useMutation({
        mutationKey: ['refreshToken'],
        mutationFn: (data: { signal?: AbortSignal }) => refreshToken(data.signal),
        onSuccess: (data) => {
            Object.assign(user, data.payload)
            // dispatch({ payload: data.payload, type: 'UPDATE' })
            manageToken().crTokenEncode(data.payload.accessToken)
        },
        onError: () => {
            manageToken().crTokenRemove()
            Object.assign(user, initializeUser)
        },
    })
    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal
        const crToken = manageToken().crTokenDecode()
        crToken && mutate({ signal })
        const idTimer = setInterval(() => {
            crToken && mutate({ signal })
        }, 1000 * 90)
        return () => {
            controller.abort()
            clearInterval(idTimer)
        }
    }, [mutate, user])
    return <contextUser.Provider value={{ user, dispatch }}>{children}</contextUser.Provider>
}

export default ProviderUser
