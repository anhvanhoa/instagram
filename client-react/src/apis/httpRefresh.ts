import { POST } from '~/config/httpRequest';
const httpRefresh = (config?: {}): Promise<{ accessToken: string }> => {
    const path: string = '/auth/refresh-token';
    const res = POST(path, {}, config);
    return res;
};

export default httpRefresh;
