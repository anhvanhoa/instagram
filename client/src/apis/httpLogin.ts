import { POST } from '~/config/httpRequest';
import { AuthLogin, UserBasic } from '~/types/auth';
const httpLogin = (data: AuthLogin, config?: {}): Promise<UserBasic> => {
    const path: string = '/auth/login';
    const res = POST(path, data, config);
    return res;
};

export default httpLogin;
