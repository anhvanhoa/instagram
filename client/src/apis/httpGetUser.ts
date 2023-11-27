import { httpToken } from '~/config/httpRequest';
import { User } from '~/types/auth';
const httpGetUser = (config?: {}): Promise<User> => {
    const path: string = '/user';
    const res = httpToken.GET(path, config);
    return res;
};

export default httpGetUser;
