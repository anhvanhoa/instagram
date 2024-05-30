import { useMutation, useQueryClient } from '@tanstack/react-query'
import follow from '~/apis/follow'
import { TypeUser } from '~/apis/getUser'
import removeFollowerRequest from '~/apis/removeFollowerRequest'
import unfollow from '~/apis/unfollow'
import useAuth from './useAuth'

const useUnfollow = ({ userName }: { userName: string }) => {
    const queryClient = useQueryClient()
    const queryKey = ['account', 'profile', userName]
    const handleSuccessDefault = (isFollowing: false) => () => {
        {
            const { user, additional } = queryClient.getQueryData<TypeUser>(queryKey)!
            const totalFollowers = user.totalFollowers - 1
            queryClient.setQueryData<TypeUser>(queryKey, {
                user: { ...user, totalFollowers },
                additional: {
                    ...additional,
                    isFollowing,
                },
            })
        }
    }
    const unfollowRequest = useMutation({
        mutationKey: ['unfollow'],
        mutationFn: (id: string) => unfollow(id),
    })
    return { handleSuccessDefault, ...unfollowRequest }
}

const useFollow = ({ userName }: { userName: string }) => {
    const queryClient = useQueryClient()
    const queryKey = ['account', 'profile', userName]
    const handleSuccess = (isFollowing: true) => () => {
        {
            const { user, additional } = queryClient.getQueryData<TypeUser>(queryKey)!
            const totalFollowers = user.totalFollowers + 1
            queryClient.setQueryData<TypeUser>(queryKey, {
                user: { ...user, totalFollowers },
                additional: {
                    ...additional,
                    isFollowing,
                },
            })
        }
    }
    return useMutation({
        mutationKey: ['follow'],
        mutationFn: (id: string) => follow(id),
        onSuccess: handleSuccess(true),
    })
}

const useRemoveFollow = ({ userName }: { userName: string }) => {
    const queryClient = useQueryClient()
    const queryKey = ['account', 'profile', userName]
    const handleSuccessDefault = (isFollower: true) => () => {
        {
            const { user, additional } = queryClient.getQueryData<TypeUser>(queryKey)!
            const totalFollowing = user.totalFollowing + 1
            queryClient.setQueryData<TypeUser>(queryKey, {
                user: { ...user, totalFollowing },
                additional: {
                    ...additional,
                    isFollower,
                },
            })
        }
    }

    const remove = useMutation({
        mutationKey: ['remove-follow'],
        mutationFn: (id: string) => removeFollowerRequest(id),
    })
    return { ...remove, handleSuccessDefault }
}

const useSuccessUpdateMe = () => {
    const queryClient = useQueryClient()
    const { user: me } = useAuth()
    const successUnfollow = () => {
        {
            const queryKey = ['account', 'profile', me.userName]
            const { user, additional } = queryClient.getQueryData<TypeUser>(queryKey)!
            const totalFollowing = user.totalFollowing - 1
            queryClient.setQueryData<TypeUser>(queryKey, {
                user: { ...user, totalFollowing },
                additional: additional,
            })
        }
    }
    const successRemove = () => {
        {
            const queryKey = ['account', 'profile', me.userName]
            const { user, additional } = queryClient.getQueryData<TypeUser>(queryKey)!
            const totalFollowers = user.totalFollowers - 1
            queryClient.setQueryData<TypeUser>(queryKey, {
                user: { ...user, totalFollowers },
                additional,
            })
        }
    }
    return { successRemove, successUnfollow }
}

export { useUnfollow, useFollow, useRemoveFollow, useSuccessUpdateMe }
