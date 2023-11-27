import { POST } from '~/config/httpRequest';
const httpUniqueUsername = async (data: { userName: string }) => {
    const res = await POST('/auth/unique-username', data);
    return res;
};

export default httpUniqueUsername;
