import { http } from '~/config/httpAxios'
import { Notification } from '~/types/chat'

const getNotification = async () => {
    const { payload } = await http.get<Notification[]>('/notify')
    return payload.data
}

export default getNotification
