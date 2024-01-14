import { User } from '~/types/auth'
import { ActionType } from './constant'

const reducer = (state: User, action: ActionType) => {
    switch (action.type) {
        case 'LOGIN':
            localStorage.setItem('cr_token', action.payload.accessToken)
            localStorage.setItem('profile_id', action.payload._id)
            return action.payload
        case 'LOGOUT':
            localStorage.removeItem('cr_token')
            localStorage.removeItem('profile_id')
            return action.payload
        case 'UPDATE':
            return action.payload
        default:
            return state
    }
}
export default reducer
