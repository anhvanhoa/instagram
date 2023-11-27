import { httpToken } from '~/config/httpRequest';
const httpUnFollow = (data: {}, config?: {}): Promise<{ message: string }> => {
    const path: string = '/user/unfollow';
    const res = httpToken.POST(path, data, config);
    return res;
};

export default httpUnFollow;
