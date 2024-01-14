import React from 'react'
import Button from '~/components/Button'
import { User } from '~/types/auth'
import Img from './Img'
import { Link } from 'react-router-dom'

interface Props {
    user: User
}
const InfoChat: React.FC<Props> = ({ user }) => {
    return (
        <div className='flex flex-col items-center my-8 gap-y-4'>
            <div className='w-24 h-24 rounded-[50%] overflow-hidden'>
                <Img src={user.avatar} alt={user.fullName} className='w-full h-full object-cover' />
            </div>
            <div className='text-center'>
                <p className='text-xl font-semibold'>{user.fullName}</p>
                <p className='text-sm text-gray-500'>{user.userName} · Instagram</p>
            </div>
            <Link to={`/${user.userName}`}>
                <Button type='second' size='custom'>
                    Xem trang cá nhân
                </Button>
            </Link>
        </div>
    )
}

export default InfoChat
