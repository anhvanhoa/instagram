import { httpToken } from '~/config/httpRequest';
const httpCheckFollow = (data: {}, config?: {}): Promise<{ isFollowing: boolean }> => {
    const path: string = '/user/check-follow';
    const res = httpToken.POST(path, data, config);
    return res;
};

export default httpCheckFollow;
