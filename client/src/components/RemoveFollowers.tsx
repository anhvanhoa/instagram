import { UserBase } from '~/types/auth'
import Button from './Button'
import Img from './Img'
import React from 'react'
import { notAvatarServer } from '~/constants/user'
import { useRemoveFollow } from '~/hooks/follow.hook'

export type PropsRemoveFollowers = {
    user: UserBase
    onClose?: () => void
    onSuccess?: (data: number) => void
}

const RemoveFollowers: React.FC<PropsRemoveFollowers> = ({
    user,
    onClose,
    onSuccess,
}) => {
    const remove = useRemoveFollow({ userName: user.userName })
    const handleRemove = () => {
        remove.mutate(user._id, {
            onSuccess: onSuccess || remove.handleSuccessDefault(true),
        })
    }
    return (
        <div>
            <div className='pt-8 flex flex-col gap-6 text-center'>
                <div className='w-24 h-24 mx-auto'>
                    <Img
                        src={user.avatar || notAvatarServer}
                        alt={user.fullName}
                        isCircle
                        className='object-cover'
                    />
                </div>
                <div>
                    <p className='text-xl font-semibold'>Remove Follower</p>
                    <p className='text-sm mt-2 px-4'>
                        Instagram won't tell diep.iep they were removed from your
                        followers.
                    </p>
                </div>
                <div className=''>
                    <Button
                        onClick={handleRemove}
                        type='text'
                        className='border-t border-second text-red-600 hover:text-red-400 w-full rounded-none py-3'
                    >
                        Remove
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
        </div>
    )
}

export default RemoveFollowers
