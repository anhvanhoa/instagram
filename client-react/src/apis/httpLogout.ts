import { POST } from '~/config/httpRequest';
const httpLogout = (config?: {}): Promise<{ message: string }> => {
    const path: string = '/auth/logout';
    const res = POST(path, {}, config);
    return res;
};

export default httpLogout;
