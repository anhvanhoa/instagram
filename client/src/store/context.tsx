import { Dispatch, createContext } from 'react'
import { ActionType, initializeUser } from './constant'
import { User } from '~/types/auth'
interface ContextType {
    user: User
    dispatch: Dispatch<ActionType>
}
export const contextUser = createContext<ContextType>({ user: initializeUser, dispatch: () => {} })
