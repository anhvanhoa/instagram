import { useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import { routersPrivate, routersPublic } from '~/router'
function App() {
    const auth = false
    const [routers] = useState(() => (auth ? routersPrivate : routersPublic))
    return <RouterProvider router={routers} />
}

export default App
