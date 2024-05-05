import { http } from '~/config/httpAxios'

const roomRequest = async (id: string) => {
    const res = await http.get<string>(`/chat/room/${id}`)
    return res.payload.data
}

export default roomRequest
