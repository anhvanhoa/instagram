import { httpToken } from '~/config/httpAxios'
import { UserChat } from '~/types/chat'
const userChat = async () => {
    const { data } = await httpToken.get<UserChat[]>('/chat/user')
    return data
}

export default userChat
