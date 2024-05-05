export type ResponseMessage = { message: string }

export interface ResponseData<T> extends ResponseMessage {
    data: T
}
export type ResponseHttp<T> = T extends undefined ? ResponseMessage : ResponseData<T>
