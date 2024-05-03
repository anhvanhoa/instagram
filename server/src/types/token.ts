import { DocumentModel } from '~/models'

export interface Token extends DocumentModel<Token> {
    _id: string
    idUser: string
    token: string
}
