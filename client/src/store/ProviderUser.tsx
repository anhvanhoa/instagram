import React, { useReducer } from 'react'
import reducer from './reducer'
import { initializeUser } from './constant'
import { contextUser } from './context'

const ProviderUser: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initializeUser)
    return <contextUser.Provider value={{ state, dispatch }}>{children}</contextUser.Provider>
}

export default ProviderUser
