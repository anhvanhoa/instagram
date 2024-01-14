import { RouterProvider } from 'react-router-dom'
import { routersPrivate, routersPublic } from '~/router'
import useContextUser from './store/hook'
import LoadPage from '~/components/LoadPage'
import { useQuery } from '@tanstack/react-query'
import profile from './apis/profile'
import { useEffect, useState } from 'react'
import { initializeUser } from './store/constant'
import socket from './socketIo'
function App() {
    const [load, setLoad] = useState(true)
    const { state, dispatch } = useContextUser()
    const cr_token = localStorage.getItem('cr_token')
    const profile_id = localStorage.getItem('profile_id')
    const { data, isLoading, isSuccess, isError } = useQuery({
        queryKey: ['user'],
        queryFn: () => profile(profile_id || ''),
        enabled: Boolean(profile_id) && Boolean(cr_token),
        refetchOnWindowFocus: false,
    })
    useEffect(() => {
        if (data && isSuccess)
            dispatch({
                type: 'UPDATE',
                payload: data,
            })
        if (isError)
            dispatch({
                type: 'LOGOUT',
                payload: initializeUser,
            })
        socket.on('connect_server', (id) => id === socket.id && setLoad(false))
        socket.emit(`joinRoom`, state._id)
        return () => {
            socket.emit(`leaveRoom`, state._id)
        }
    }, [data, dispatch, isSuccess, isError, state._id])
    return (
        <div>
            {(isLoading || load) && <LoadPage />}
            {cr_token && profile_id && <RouterProvider router={routersPrivate} />}
            {(!cr_token || !profile_id) && <RouterProvider router={routersPublic} />}
        </div>
    )
}

export default App
