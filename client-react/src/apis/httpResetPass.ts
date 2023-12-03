import { PATCH } from '~/config/httpRequest';
const httpResetPass = async (data: { password: string }, token: string) => {
    const res = await PATCH('/auth/reset-password', data, {
        headers: {
            token: `Bearer ${token}`,
        },
    });
    return res;
};

export default httpResetPass;
