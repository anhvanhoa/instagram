import { http } from '~/config/httpAxios'
import { Posts } from '~/types/posts'
const editPostRequest = async (posts: Pick<Posts, '_id' | 'title'>) => {
    const { payload } = await http.patch(`/posts/edit`, posts)
    return payload
}

export default editPostRequest
