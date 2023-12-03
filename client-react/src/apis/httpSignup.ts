import { Signup } from '~/types/auth';
import { POST } from '~/config/httpRequest';

const httpSignup = (data: Signup) => {
    const path: string = '/auth/register';
    const res = POST(path, data);
    return res;
};

export default httpSignup;
