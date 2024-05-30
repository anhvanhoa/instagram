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
import Post from '~/pages/Post'
import NotFound from '~/pages/NotFound'
import Notification from '~/pages/Notification'
import { CreatePosts } from '~/pages/CreatePosts'
import Settings from '~/layouts/Settings'
import checkUserRequest from '~/apis/checkUserRequest'
import manageToken from '~/utils/rfToken'
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
            errorElement: (
                <LayoutMain>
                    <NotFound />
                </LayoutMain>
            ),
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
                    element: <Post />,
                    path: pathPrivate.posts,
                },
                {
                    element: <Profile />,
                    id: 'root',
                    path: pathPrivate.profile,
                    loader: async ({ params }) => {
                        if (!manageToken().crTokenDecode()) return null
                        const user = await checkUserRequest(params.username!)
                        if (user.data.isAccount) return true
                    },
                },
                {
                    element: <Settings />,
                    path: pathPrivate.settings.path,
                    children: [
                        {
                            element: null,
                            loader: async () => {},
                            path: '',
                        },
                        {
                            element: <EditProfile />,
                            path: pathPrivate.settings.accountEdit,
                        },
                    ],
                },
                {
                    element: <Notification />,
                    path: pathPrivate.notification,
                },
                {
                    element: <CreatePosts />,
                    path: pathPrivate.createPosts,
                },
            ],
        },
    ],
    option,
)
