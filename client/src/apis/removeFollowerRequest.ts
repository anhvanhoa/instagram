import { http } from '~/config/httpAxios'

const removeFollowerRequest = async (id: string) => {
    const { httpStatus } = await http.post(`/user/${id}/remove-follower`, {})
    return httpStatus
}

export default removeFollowerRequest
