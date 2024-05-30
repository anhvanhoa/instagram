import { http } from '~/config/httpAxios'
import { Media, Posts } from '~/types/posts'

export interface PostsUpload {
    title: string
    media: Media[]
}

const uploadPostRequest = async (posts: PostsUpload) => {
    const { payload } = await http.post<Posts>('/posts/upload', posts)
    return payload.data
}

export default uploadPostRequest
