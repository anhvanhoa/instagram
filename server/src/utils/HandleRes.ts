import { HttpStatus } from '~/http-status.enum'

class HandleRes {
    public httpResponse<T>(httpStatus: HttpStatus, data: T, isLogger: boolean = false) {
        isLogger && console.log({ httpStatus, data })
        return { httpStatus, data }
    }
}

const handleRes = new HandleRes()
const httpResponse = handleRes.httpResponse

export { httpResponse }
export default handleRes
