import { httpToken } from '~/config/httpAxios'

const uploadImg = async (dataForm: FormData) => {
    const { data } = await httpToken.postForm<string>('/image/upload', dataForm, {
        withCredentials: true,
    })
    return data
}

export default uploadImg
