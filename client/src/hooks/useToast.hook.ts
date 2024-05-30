import { useContext } from 'react'
import { ContextToast } from '~/providers/ToastProvider'

const useToast = () => {
    return useContext(ContextToast)
}

export default useToast
