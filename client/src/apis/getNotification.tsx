import { httpToken } from '~/config/httpAxios'
import { Notification } from '~/types/chat'

const getNotification = async () => {
    const { data } = await httpToken.get<Notification[]>('/notify')
    return data
}

export default getNotification
