import { http } from '~/config/httpAxios'
const unblockUser = async ({ idUserBlock }: { idUserBlock: string }) => {
    const { payload } = await http.post<string>(`/user/unblock`, {
        idUserBlock,
    })
    return payload.data
}

export default unblockUser
