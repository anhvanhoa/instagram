import React from 'react'
import Img from './Img'
import { UserBase } from '~/types/auth'
import { notAvatarServer } from '~/constants/user'
import Button from './Button'
import { useUnfollow } from '~/hooks/follow.hook'
import { stopPropagation } from '~/utils/helper'

export type PropsUnfollow = {
    user: UserBase
    onClose?: () => void
    onSuccess?: (data: number) => void
}

const Unfollow: React.FC<PropsUnfollow> = ({ user, onClose, onSuccess }) => {
    const unfollow = useUnfollow({ userName: user.userName })
    const handleUnfollow = () => {
        unfollow.mutate(user._id, {
            onSuccess: onSuccess || unfollow.handleSuccessDefault(false),
        })
    }
    return (
        <div className='pt-8 flex flex-col gap-6 text-center'>
            <div onClick={stopPropagation(true)}>
                <div className='w-24 h-24 mx-auto'>
                    <Img
                        src={user.avatar || notAvatarServer}
                        alt={user.fullName}
                        isCircle
                        className='object-cover'
                    />
                </div>
            </div>
            <p className='text-sm'>Unfollow @{user.userName}</p>
            <div className=''>
                <Button
                    onClick={handleUnfollow}
                    type='text'
                    className='border-t border-second text-red-600 hover:text-red-400 w-full rounded-none py-3'
                >
                    Unfollow
                </Button>
                <Button
                    onClick={onClose}
                    type='custom'
                    className='border-t border-second font-normal w-full rounded-none py-3'
                >
                    Cancel
                </Button>
            </div>
        </div>
    )
}

export default Unfollow
