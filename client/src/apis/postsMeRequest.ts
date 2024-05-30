import { http } from '~/config/httpAxios'
import { ResponsePost } from '~/types/posts'

const postsMeRequest = async ({ username }: { username: string }) => {
    const res = await http.get<ResponsePost[]>(`/posts/${username}/user`, {
        params: {
            limit: 10,
            page: 1,
        },
    })
    return res.payload.data
}

export default postsMeRequest
