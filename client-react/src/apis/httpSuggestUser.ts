import { GET } from '~/config/httpRequest';
import { User } from '~/types/auth';
const httpSuggestUser = (id: string, limit: number, config?: {}): Promise<User[]> => {
    const path: string = `/user/suggest/${id}?limit=${limit}`;
    const res = GET(path, config);
    return res;
};

export default httpSuggestUser;
