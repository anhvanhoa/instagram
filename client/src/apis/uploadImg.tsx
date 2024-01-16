import { httpToken } from '~/config/httpAxios'

const uploadImg = async (dataForm: FormData) => {
    const { data } = await httpToken.postForm<string>('/image/upload', dataForm)
    return data
}

export default uploadImg
