import { Response, response } from 'express';
import { HttpStatus } from '~/http-status.enum';

class HandleRes {
    public success(message: string, data?: any) {
        return { message, data };
    }
    public error(message: string, err?: any) {
        return { message };
    }
    public httpResponse<T>(httpStatus: HttpStatus, data: T, isLogger: boolean = false) {
        isLogger && console.log({ httpStatus, data });
        return { httpStatus, data };
    }
}
const handleRes = new HandleRes();
const resSuccess = handleRes.success;
const resError = handleRes.error;
const httpResponse = handleRes.httpResponse;

export { resSuccess, resError, httpResponse };
export default handleRes;
