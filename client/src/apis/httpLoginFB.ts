import { GET } from '~/config/httpRequest';
const httpLoginFB = () => {
    const path: string = '/oauth/login/facebook';
    const res = GET(path);
    return res;
};

export default httpLoginFB;
