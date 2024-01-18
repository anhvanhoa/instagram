import { httpToken } from '~/config/httpAxios'
import { Posts } from '~/types/posts'

const editPosts = async (posts: Pick<Posts, '_id' | 'title'>) => {
    const { data } = await httpToken.patch(`/posts/edit`, posts)
    return data
}

export default editPosts
