import { User } from '~/types/auth'
import { ActionType } from './constant'
import manageToken from '~/utils/rfToken'

const reducer = (state: User, action: ActionType) => {
    switch (action.type) {
        case 'LOGIN':
            manageToken().crTokenEncode(action.payload.accessToken)
            return action.payload
        case 'LOGOUT':
            manageToken().crTokenRemove()
            return action.payload
        case 'UPDATE':
            return action.payload
        default:
            return state
    }
}
export default reducer
