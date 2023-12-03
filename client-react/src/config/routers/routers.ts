const routers = {
    home: '/',
    explore: '/explore',
    reels: '/reels',
    direct: '/direct',
    user: '/:user',
    userSaved: '/:user/:slug',
    login: '/account/login',
    signup: '/account/signup',
    info: '/account/info',
    forgotPass: '/account/forgot-password',
    resetPass: '/account/reset-password',
    notFound: '*',
};

export default routers;
