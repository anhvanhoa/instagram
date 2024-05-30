import { useQuery } from '@tanstack/react-query'
import getNotification from '~/apis/getNotification'

const useNotification = ({ limit = 12 }: { limit?: number }) => {
    return useQuery({
        queryKey: ['notification', limit],
        queryFn: () => getNotification(),
    })
}

export { useNotification }
