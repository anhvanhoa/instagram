import { User } from '~/types/auth'
import { ActionType } from './constant'

const reducer = (state: User, action: ActionType) => {
    switch (action.type) {
        case 'LOGIN':
            return action.payload
        case 'LOGOUT':
            return action.payload
        default:
            return state
    }
}
export default reducer
