import { RouterProvider } from 'react-router-dom'
import { routersPrivate, routersPublic } from '~/router'
import useContextUser from './store/hook'
import LoadPage from '~/components/LoadPage'
import { useEffect, useState } from 'react'

function App() {
    const [load, setLoad] = useState(true)
    const { user } = useContextUser()
    useEffect(() => {
        const id = setTimeout(() => setLoad(false), 2000)
        return () => {
            clearTimeout(id)
        }
    }, [])

    return (
        <div>
            {load && <LoadPage />}
            {user.accessToken && <RouterProvider router={routersPrivate} />}
            {!user.accessToken && <RouterProvider router={routersPublic} />}
        </div>
    )
}

export default App
