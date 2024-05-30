import { http } from '~/config/httpAxios'
const blockUser = async ({ idUserBlock }: { idUserBlock: string }) => {
    const { payload } = await http.post<string>(`/user/block`, {
        idUserBlock,
    })
    return payload.data
}

export default blockUser
