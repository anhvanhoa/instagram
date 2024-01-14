import { httpToken } from '~/config/httpAxios'
import { Notification } from '~/types/chat'

const getNotification = async () => {
    const { data } = await httpToken.get<Notification[]>('/notify', {
        withCredentials: true,
    })
    return data
}

export default getNotification
