import { POST } from '~/config/httpRequest';
const httpForgotPass = async (data: {}) => {
    const res = await POST('/auth/forgot-password', data);
    return res;
};

export default httpForgotPass;
