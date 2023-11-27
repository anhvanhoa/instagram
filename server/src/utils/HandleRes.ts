class HandleRes {
    public success(message: string, data?: any) {
        return { message, data };
    }
    public error(message: string, err?: any) {
        console.log(err);
        return { message };
    }
}
const handleRes = new HandleRes();
const resSuccess = handleRes.success;
const resError = handleRes.error;

export { resSuccess, resError };
export default handleRes;
