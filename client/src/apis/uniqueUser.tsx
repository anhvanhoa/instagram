import http from '~/config/httpAxios'
import { UniqueUser } from '~/types/auth'
export type TypeUniqueUser = {
    type: 'email' | 'tell' | 'userName'
    unique: boolean
}
const uniqueUser = async (data: UniqueUser) => {
    const result = await http.post<TypeUniqueUser>('/auth/unique-info', data)
    return result.data
}

export default uniqueUser
