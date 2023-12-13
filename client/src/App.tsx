import { RouterProvider } from 'react-router-dom'
import { routersPrivate, routersPublic } from '~/router'
import useContextUser from './store/hook'
import LoadPage from './components/LoadPage'
import { useEffect, useState } from 'react'
function App() {
    const [load, setLoad] = useState(false)
    const {
        state: { accessToken },
    } = useContextUser()
    const routers = !accessToken ? routersPrivate : routersPublic
    useEffect(() => {
        const timeId = setTimeout(() => setLoad(true), 800)
        return () => clearTimeout(timeId)
    }, [])
    return (
        <div>
            {!load && <LoadPage />}
            {load && <RouterProvider router={routers} />}
        </div>
    )
}

export default App
