import { POST } from '~/config/httpRequest';
const httpCheckReset = async (data: { id: string; token: string }) => {
    const res = await POST('/auth/check-reset-password', data, {
        headers: {
            token: `Bearer ${data.token}`,
        },
    });
    return res;
};

export default httpCheckReset;
