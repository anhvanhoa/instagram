import { http } from '~/config/httpAxios'
import { UserChat } from '~/types/chat'
const usersChatRequest = async () => {
    const { payload } = await http.get<UserChat[]>('/chat/users')
    return payload
}

export default usersChatRequest
