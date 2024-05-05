import { http } from '~/config/httpAxios'

const uploadImgRequest = async (dataForm: FormData) => {
    const { payload } = await http.postForm<string>('/image/upload', dataForm, {
        timeout: 30 * 60 * 1000,
    })
    return payload.data
}

export default uploadImgRequest
