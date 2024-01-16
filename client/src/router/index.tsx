import { createBrowserRouter } from 'react-router-dom'
import LayoutAuth from '~/layouts/LayoutAuth'
import LayoutMain from '~/layouts/LayoutMain'
import Home from '~/pages/Home'
import Login from '~/pages/auth/Login'
import { pathPublic, pathPrivate } from '~/config/routes'
import Register from '~/pages/auth/Register'
import HomeNotAuth from '~/pages/HomeNotAuth'
import Profile from '~/pages/Profile'
import EditProfile from '~/pages/EditProfile'
import Explore from '~/pages/Explore'
import Reels from '~/pages/Reels'
import Message from '~/pages/Message'
import Posts from '~/pages/Posts'
import NotFound from '~/pages/NotFound'
const option = {
    basename: '/',
}
export const routersPublic = createBrowserRouter(
    [
        {
            element: <LayoutAuth />,
            errorElement: <NotFound />,
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
    ],
    option,
)
export const routersPrivate = createBrowserRouter(
    [
        {
            element: <LayoutMain />,
            errorElement: <NotFound />,
            children: [
                {
                    element: <Home />,
                    path: pathPrivate.home,
                },
                {
                    element: <Explore />,
                    path: pathPrivate.explore,
                },
                {
                    element: <Reels />,
                    path: pathPrivate.reels,
                },
                {
                    element: <Message />,
                    path: pathPrivate.inbox,
                },
                {
                    element: <Message />,
                    path: pathPrivate.chat,
                },
                {
                    element: <Posts />,
                    path: pathPrivate.posts,
                },
                {
                    element: <Profile />,
                    path: pathPrivate.profile,
                },
                {
                    element: <EditProfile />,
                    path: pathPrivate.editProfile,
                },
            ],
        },
    ],
    option,
)
