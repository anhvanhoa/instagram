import { createBrowserRouter } from 'react-router-dom'
import LayoutAuth from '~/layouts/LayoutAuth'
import LayoutMain from '~/layouts/LayoutMain'
import Home from '~/pages/Home'
import Login from '~/pages/auth/Login'
import { pathPublic, pathPrivate } from '~/config/routes'
import Register from '~/pages/auth/Register'
import HomeNotAuth from '~/pages/HomeNotAuth'
export const routersPublic = createBrowserRouter([
    {
        element: <LayoutAuth />,
        children: [
            {
                element: <HomeNotAuth />,
                path: pathPublic.home,
            },
            {
                element: <Login />,
                path: pathPublic.login,
            },
            {
                element: <Register />,
                path: pathPublic.signup,
            },
        ],
    },
])
export const routersPrivate = createBrowserRouter([
    {
        element: <LayoutMain />,
        children: [
            {
                element: <Home />,
                path: pathPrivate.home,
            },
            {
                element: <Home />,
                path: pathPrivate.explore,
            },
            {
                element: <Home />,
                path: pathPrivate.reels,
            },
            {
                element: <Home />,
                path: pathPrivate.inbox,
            },
        ],
    },
])
