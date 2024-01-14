import IconApp from '~/assets/icons/IconApp'
import Img from './Img'
import { User } from '~/types/auth'
import React from 'react'
interface Props {
    user: User
    timer?: string
}
const HeaderChat: React.FC<Props> = ({ user }) => {
    return (
        <div className='flex items-center justify-between p-4 border-b'>
            <div className='flex items-center'>
                <div className='w-11 h-11 rounded-[50%] overflow-hidden'>
                    <Img src={user.avatar} alt='' className='w-full h-full object-cover' />
                </div>
                <div className='ml-3'>
                    <p className='font-semibold'>{user.userName}</p>
                    <p className='text-xs text-gray-500 mt-1'>Đang hoạt động</p>
                </div>
            </div>
            <div className='flex items-center gap-x-4'>
                <span className='cursor-pointer hidden'>
                    <IconApp type='call' />
                </span>
                <span className='cursor-pointer hidden'>
                    <IconApp type='call-video' />
                </span>
                <span className='cursor-pointer'>
                    <IconApp type='info' />
                </span>
            </div>
        </div>
    )
}

export default HeaderChat
