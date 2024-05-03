import { http } from '~/config/httpAxios'

const deletePosts = async (id: string) => {
    const { payload } = await http.delete(`/posts/delete/${id}`)
    return payload
}

export default deletePosts
