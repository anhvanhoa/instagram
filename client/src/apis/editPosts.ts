import { http } from '~/config/httpAxios'
import { Posts } from '~/types/posts'

const editPosts = async (posts: Pick<Posts, '_id' | 'title'>) => {
    const { payload } = await http.patch(`/posts/edit`, posts)
    return payload
}

export default editPosts
