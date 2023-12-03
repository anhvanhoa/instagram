import { Router } from '~/types/router';
import routers from '~/config/routers/routers';
import Home from '~/page/Home';
import Explore from '~/page/Explore';
import Direct from '~/page/Direct';
import Reels from '~/page/Reels';
import User from '~/page/Account/User';
import Login from '~/page/Account/Login';
import Signup from '~/page/Account/Signup';
import InfoAuth from '~/page/Account/InfoAuth';
import ForgotPass from '~/page/Account/ForgotPass';
import ResetPass from '~/page/Account/ResetPass';
import NotFound from '~/page/NotFound';

const routersPrivate: Router[] = [
    {
        path: routers.home,
        element: <Home />,
        layout: 'main',
    },
    {
        path: routers.direct,
        element: <Direct />,
        layout: 'main',
    },
    {
        path: routers.explore,
        element: <Explore />,
        layout: 'footer',
    },
    {
        path: routers.reels,
        element: <Reels />,
        layout: 'main',
    },
    {
        path: routers.user,
        element: <User />,
        layout: 'footer',
    },
    {
        path: routers.userSaved,
        element: <User />,
        layout: 'footer',
    },
    {
        path: routers.notFound,
        element: <NotFound />,
        layout: 'main',
    },
];

const routersPublic: Router[] = [
    {
        path: routers.login,
        element: <Login />,
        layout: 'onlyFooter',
    },
    {
        path: routers.home,
        element: <InfoAuth />,
        layout: 'onlyFooter',
    },
    {
        path: routers.signup,
        element: <Signup />,
        layout: 'onlyFooter',
    },
    {
        path: routers.forgotPass,
        element: <ForgotPass />,
        layout: 'notAuth',
    },
    {
        path: routers.resetPass,
        element: <ResetPass />,
        layout: 'notAuth',
    },
    {
        path: routers.notFound,
        element: <NotFound />,
        layout: 'notAuth',
    },
];

export { routersPrivate, routersPublic };
