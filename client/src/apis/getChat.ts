import { http } from '~/config/httpAxios'
import { ContentChat } from '~/types/chat'

const getChat = async (idRoom: string) => {
    const { payload } = await http.get<ContentChat[]>(`/chat/${idRoom}`)
    return payload
}

export default getChat
