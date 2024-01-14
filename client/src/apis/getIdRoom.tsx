import { httpToken } from '~/config/httpAxios'

const getIdRoom = async (idUser: string) => {
    const { data } = await httpToken.get<{ idRoom: string }>(`/chat/room/${idUser}`, {
        withCredentials: true,
    })
    return data
}

export default getIdRoom
