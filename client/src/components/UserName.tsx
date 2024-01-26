import TippyHeadless from '@tippyjs/react/headless'
import { User } from '~/types/auth'
import { Link } from 'react-router-dom'
import TippyUser from './TippyUser'
import { useMutation, useQuery } from '@tanstack/react-query'
import infoUser from '~/apis/infoUser'
import React from 'react'
import { initializeUser } from '~/store/constant'
import follow from '~/apis/follow'
import unfollow from '~/apis/unfollow'
interface Props {
    to?: string
    dropDow?: boolean
    user: User
}
const UserName: React.FC<Props> = ({ dropDow, user }) => {
    const { data, refetch } = useQuery({
        queryKey: ['info', user.userName],
        queryFn: () => infoUser(user.userName),
        initialData: { ...initializeUser, isFollowing: false, isFollower: false },
        refetchOnWindowFocus: false,
        enabled: false,
    })
    const handleApi = () => {
        refetch({ cancelRefetch: true })
    }
    const { mutate, isPending } = useMutation({
        mutationFn: (id: string) => follow(id),
        onSuccess: handleApi,
    })
    const { mutate: mutateUn, isPending: isPending2 } = useMutation({
        mutationFn: (id: string) => unfollow(id),
        onSuccess: handleApi,
    })
    const apiFollow = (id: string) => () => mutate(id)
    const apiUnFollow = (id: string) => () => mutateUn(id)

    return (
        <div>
            <TippyHeadless
                disabled={!dropDow}
                delay={[800, 100]}
                interactive
                placement='bottom'
                render={() => (
                    <TippyUser
                        isFollow={data.isFollowing}
                        onFollow={apiFollow(user._id)}
                        onUnFollow={apiUnFollow(user._id)}
                        loading={isPending || isPending2}
                        data={user}
                    />
                )}
            >
                <Link className='text-sm' to={`/${user.userName}`}>
                    <h2 onMouseEnter={handleApi} className='flex items-center font-semibold'>
                        {user.userName}
                    </h2>
                </Link>
            </TippyHeadless>
        </div>
    )
}

export default UserName
