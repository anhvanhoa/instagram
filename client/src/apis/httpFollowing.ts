import { httpToken } from '~/config/httpRequest';
const httpFollowing = (data: {}, config?: {}): Promise<{ message: string }> => {
    const path: string = '/user/following';
    const res = httpToken.POST(path, data, config);
    return res;
};

export default httpFollowing;
