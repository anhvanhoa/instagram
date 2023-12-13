import { useContext } from 'react'
import { contextUser } from './context'

const useContextUser = () => useContext(contextUser)

export default useContextUser
