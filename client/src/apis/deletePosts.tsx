import { httpToken } from '~/config/httpAxios'

const deletePosts = async (id: string) => {
    const { data } = await httpToken.delete(`/posts/delete/${id}`)
    return data
}

export default deletePosts
