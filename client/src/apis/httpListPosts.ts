import { POST } from '~/config/httpRequest';
import { Posts } from '~/types/posts';
const httpListPosts = (data: { id: string }, config?: {}): Promise<Posts[]> => {
    const path: string = '/posts/follow';
    const res = POST(path, data, config);
    return res;
};

export default httpListPosts;
