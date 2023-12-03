import { POST } from '~/config/httpRequest';
const httpOtp = async (data: { emailOrPhone: string }) => {
    const res = await POST('/auth/verification-codes', data);
    return res;
};

export default httpOtp;
