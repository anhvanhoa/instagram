import { Dispatch, createContext } from 'react'
import { ActionType, initializeUser } from './constant'
import { User } from '~/types/auth'
interface ContextType {
    state: User
    dispatch: Dispatch<ActionType>
}
export const contextUser = createContext<ContextType>({ state: initializeUser, dispatch: () => {} })
