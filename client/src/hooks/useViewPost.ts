import { useNavigate } from 'react-router-dom'

const useViewPost = () => {
    const navigate = useNavigate()
    return (id: string) => {
        navigate(`/p/${id}`, {
            preventScrollReset: true,
        })
    }
}

export default useViewPost
