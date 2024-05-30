import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import blockUser from '~/apis/blockUser'
import getUser from '~/apis/getUser'
import serachUser from '~/apis/serachUser'
import suggestUsersRequest from '~/apis/suggestUsersRequest'
import unblockUser from '~/apis/unblockUser'
import { initUserFollow } from '~/constants/user'

type SearchUser = {
    value: string
}

const useSearchUser = ({ value }: SearchUser) => {
    return useQuery({
        queryKey: ['search', value],
        queryFn: () => serachUser(value),
        enabled: Boolean(value),
        initialData: {
            users: [],
            count_users: 0,
        },
    })
}

const useSuggestUser = ({ limit = 6 }: { limit?: number }) => {
    return useQuery({
        queryKey: ['suggest', limit],
        queryFn: () => suggestUsersRequest(limit),
        initialData: [],
        enabled: Boolean(limit),
    })
}

const useProfile = ({ username }: { username: string }) => {
    const profile = useQuery({
        queryKey: ['account', 'profile', username],
        queryFn: () => getUser(username),
        initialData: initUserFollow,
        gcTime: 0,
    })

    return profile
}

const useBlock = ({ username }: { username: string }) => {
    const clientQuery = useQueryClient()
    const handleSuccess = () => {
        clientQuery.prefetchQuery({
            queryKey: ['account', 'profile', username],
        })
    }
    return useMutation({
        mutationKey: ['block'],
        mutationFn: (idUserBlock: string) => blockUser({ idUserBlock }),
        onSuccess: handleSuccess,
    })
}

const useUnblock = ({ username }: { username: string }) => {
    const clientQuery = useQueryClient()
    const handleSuccess = () => {
        clientQuery.prefetchQuery({
            queryKey: ['account', 'profile', username],
        })
        clientQuery.prefetchQuery({
            queryKey: ['user-chat', username],
        })
        clientQuery.prefetchQuery({
            queryKey: ['posts-user', username],
        })
    }
    return useMutation({
        mutationKey: ['unblock'],
        mutationFn: (idUserBlock: string) => unblockUser({ idUserBlock }),
        onSuccess: handleSuccess,
    })
}

export { useSearchUser, useSuggestUser, useProfile, useBlock, useUnblock }
