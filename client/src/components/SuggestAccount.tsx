import { useMutation } from '@tanstack/react-query'
import AccountItem from './AccountItem'
import Button from './Button'
import follow from '~/apis/follow'
import { User } from '~/types/auth'
import React, { useState } from 'react'
import unfollow from '~/apis/unfollow'
import AlertUnfollow from './AlertUnfollow'
type ButtonType = 'custom' | 'primary' | 'text' | 'second'

interface Props {
    userP: User
    type?: ButtonType
}
const SuggestAccount: React.FC<Props> = ({ userP, type = 'text' }) => {
    const [stateFollow, setStateFollow] = useState(false)
    const [stateAlert, setAlert] = useState(false)
    const { mutate, isPending } = useMutation({
        mutationFn: (id: string) => follow(id),
        onSuccess: () => setStateFollow(true),
    })
    const { mutate: mutateUn, isPending: isPending2 } = useMutation({
        mutationFn: (id: string) => unfollow(id),
        onSuccess: () => setStateFollow(false),
    })
    const showUnfollow = () => setAlert(true)
    const hiddenUnfollow = () => setAlert(false)
    const apiFollow = (id: string) => () => mutate(id)
    const apiUnFollow = (id: string) => () => {
        mutateUn(id)
        hiddenUnfollow()
    }
    return (
        <div>
            {stateAlert && (
                <AlertUnfollow user={userP} handleUnfollow={apiUnFollow(userP._id)} handleClose={hiddenUnfollow} />
            )}
            <div className='py-2 flex justify-between items-center'>
                <AccountItem user={userP} size='small' />
                <Button
                    loading={isPending || isPending2}
                    onClick={stateFollow ? showUnfollow : apiFollow(userP._id)}
                    type={type}
                    size='small'
                    className='text-xs'
                >
                    {stateFollow ? 'Following' : 'Follow'}
                </Button>
            </div>
        </div>
    )
}

export default SuggestAccount
