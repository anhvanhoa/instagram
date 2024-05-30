import { useMutation } from '@tanstack/react-query'
import AccountItem from './AccountItem'
import Button from './Button'
import follow from '~/apis/follow'
import { UserBase } from '~/types/auth'
import React, { useState } from 'react'
import AlertUnfollow from './AlertUnfollow'
import { useUnfollow } from '~/hooks/follow.hook'

interface Props {
    user: UserBase
    isFollowing?: boolean
    type?: 'primary' | 'text'
}
const SuggestAccount: React.FC<Props> = ({ user, isFollowing = false, type }) => {
    const [stateFollow, setStateFollow] = useState(isFollowing)
    const handleSuccess = () => {
        setStateFollow(!stateFollow)
    }
    const { mutate, isPending } = useMutation({
        mutationFn: (id: string) => follow(id),
        onSuccess: handleSuccess,
    })
    const unfollow = useUnfollow({ userName: user.userName })
    const apiFollow = (id: string) => () => mutate(id)
    return (
        <div>
            <div className='py-2 flex justify-between items-center'>
                <AccountItem user={user} />
                {!stateFollow && (
                    <Button
                        loading={isPending || unfollow.isPending}
                        onClick={apiFollow(user._id)}
                        size='small'
                        className='px-2 max-w-20'
                        type={type}
                    >
                        Follow
                    </Button>
                )}
                {stateFollow && (
                    <AlertUnfollow onSuccess={handleSuccess} user={user}>
                        <Button
                            loading={isPending || unfollow.isPending}
                            size='small'
                            className='px-2 max-w-20'
                            type='second'
                        >
                            Following
                        </Button>
                    </AlertUnfollow>
                )}
            </div>
        </div>
    )
}

export default SuggestAccount
