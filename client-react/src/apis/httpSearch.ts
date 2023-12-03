import { GET } from '~/config/httpRequest';
import { User } from '~/types/auth';
const httpSearch = (q: string, config?: {}): Promise<User[]> => {
    const path: string = `/user/search?q=${q}`;
    const res = GET(path, config);
    return res;
};

export default httpSearch;
