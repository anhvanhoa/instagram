import { httpToken } from '~/config/httpAxios'
import { ContentChat } from '~/types/chat'

const getChat = async (id: string) => {
    const { data } = await httpToken.get<ContentChat[]>(`/chat/${id}`, {
        withCredentials: true,
    })
    return data
}

export default getChat