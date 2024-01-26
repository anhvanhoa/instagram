import IconApp from '~/assets/icons/IconApp'
import Img from './Img'
import { User } from '~/types/auth'
import React from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useNavigate } from 'react-router-dom'
interface Props {
    user: User
    timer?: string
}
const HeaderChat: React.FC<Props> = ({ user }) => {
    const navigate = useNavigate()
    const handleBack = () => navigate(-1)
    return (
        <div className='flex items-center justify-between py-3 px-2 border-b border-second'>
            <div className='flex items-center'>
                <div className='mr-6' onClick={handleBack}>
                    <Icon
                        icon='formkit:left'
                        className='text-2xl px-2 py-px cursor-pointer hover:bg-second hover:scale-110 transition-all rounded-lg'
                    />
                </div>
                <div className='w-9 xs:w-11 xs:h-11 rounded-[50%] overflow-hidden'>
                    <Img src={user.avatar} alt='' className='w-full h-full object-cover' />
                </div>
                <div className='ml-3'>
                    <div className='font-semibold flex items-center'>
                        <p className='text-sm leading-4 xs:text-base font-semibold'>{user.userName}</p>
                        <span className='ml-1 mt-0.5'>
                            {user.verify && <Icon className='text-primary text-xs' icon='ph:seal-check-fill' />}
                        </span>
                    </div>
                    <p className='text-xs leading-3 text-gray-500 mt-1'>{user.fullName}</p>
                </div>
            </div>
            <div className='flex items-center gap-x-4 px-2 *:dark:fill-white'>
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
