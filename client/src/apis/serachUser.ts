import { http } from '~/config/httpAxios'
import { UserBase } from '~/types/auth'

type ResponseUserSearch = {
    users: UserBase[]
    count_users: number
}

const serachUser = async (q: string) => {
    const { payload } = await http.get<ResponseUserSearch>('/user/search', {
        params: {
            q,
        },
    })

    return payload.data
}

export default serachUser
