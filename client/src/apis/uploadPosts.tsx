import { httpToken } from '~/config/httpAxios'
import { Posts } from '~/types/posts'

export interface PostsUpload {
    title: string
    contents: string[]
}

const uploadPosts = async (posts: PostsUpload) => {
    const { data } = await httpToken.post<Posts>('/posts/upload', posts)
    return data
}

export default uploadPosts
