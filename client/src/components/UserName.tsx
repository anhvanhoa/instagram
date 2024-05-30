import TippyHeadless from '@tippyjs/react/headless'
import { UserBase } from '~/types/auth'
import { Link } from 'react-router-dom'
import TippyUser from './TippyUser'
import { useMutation, useQuery } from '@tanstack/react-query'
import React from 'react'
import follow from '~/apis/follow'
import unfollow from '~/apis/unfollow'
import { initUserFollow } from '~/constants/user'
import getUser from '~/apis/getUser'
interface Props {
    to?: string
    dropDow?: boolean
    user: UserBase
}
const UserName: React.FC<Props> = ({ dropDow, user }) => {
    const { data, refetch } = useQuery({
        queryKey: ['info', user.userName],
        queryFn: () => getUser(user.userName),
        initialData: initUserFollow,
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
                placement='bottom-start'
                render={() => (
                    <TippyUser
                        isFollow={data.additional.isFollowing}
                        onFollow={apiFollow(user._id)}
                        onUnFollow={apiUnFollow(user._id)}
                        loading={isPending || isPending2}
                        account={data.user}
                    />
                )}
            >
                <Link className='text-sm' to={`/${user.userName}`}>
                    <h2
                        onMouseEnter={handleApi}
                        className='flex items-center font-semibold'
                    >
                        {user.userName}
                    </h2>
                </Link>
            </TippyHeadless>
        </div>
    )
}

export default UserName
