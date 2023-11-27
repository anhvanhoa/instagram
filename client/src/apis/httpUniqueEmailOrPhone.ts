import { POST } from '~/config/httpRequest';
const httpUniqueEmailOrPhone = async (data: { emailOrPhone: string }) => {
    const res = await POST('/auth/check-info-login', data);
    return res;
};

export default httpUniqueEmailOrPhone;
