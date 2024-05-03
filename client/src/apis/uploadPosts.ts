import { http } from '~/config/httpAxios'
import { Posts } from '~/types/posts'

export interface PostsUpload {
    title: string
    contents: string[]
}

const uploadPosts = async (posts: PostsUpload) => {
    const { payload } = await http.post<Posts>('/posts/upload', posts)
    return payload
}

export default uploadPosts