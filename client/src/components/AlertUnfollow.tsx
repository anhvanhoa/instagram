import { User } from '~/types/auth'
import Button from './Button'
import OverLay from './OverLay'
import React from 'react'
import images from '~/assets'
interface Props {
    user: User
    handleClose: () => void
    handleUnfollow: () => void
}
const AlertUnfollow: React.FC<Props> = ({ user, handleClose, handleUnfollow }) => {
    return (
        <OverLay onClose={handleClose}>
            <div className='bg-white w-[400px] rounded-xl pt-8 flex flex-col gap-6 text-center'>
                <img
                    src={user.avatar || images.noAvatar}
                    alt={user.fullName}
                    className='mx-auto w-24 h-24 rounded-[50%] object-cover'
                />
                <p className='text-sm'>Unfollow @{user.userName}</p>
                <div className=''>
                    <Button
                        onClick={handleUnfollow}
                        type='text'
                        className='border-t text-red-600 hover:text-red-400 w-full rounded-none py-3'
                    >
                        Unfollow
                    </Button>
                    <Button
                        onClick={handleClose}
                        type='custom'
                        className='border-t text-black font-normal w-full rounded-none py-3'
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </OverLay>
    )
}

export default AlertUnfollow
