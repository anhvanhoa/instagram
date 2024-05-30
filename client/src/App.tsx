import { RouterProvider } from 'react-router-dom'
import { routersPrivate, routersPublic } from '~/router'
import LoadPage from '~/components/LoadPage'
import { memo, useEffect, useState } from 'react'
import useAuth from './hooks/useAuth'

const App = memo(function () {
    const [load, setLoad] = useState(true)
    const { user } = useAuth()
    console.log('render app')
    const router = user.accessToken ? routersPrivate : routersPublic
    useEffect(() => {
        const id = setTimeout(() => setLoad(false), 2000)
        return () => {
            clearTimeout(id)
        }
    }, [])

    return (
        <>
            {load && <LoadPage />}
            {!load && <RouterProvider router={router} />}
        </>
    )
})

export default App
