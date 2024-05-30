import React from 'react'
import Img from './Img'
import UserName from './UserName'
import { formatTimeAgo } from '~/utils/handleTime'
import { Icon } from '@iconify/react/dist/iconify.js'
import { UserBase } from '~/types/auth'
import { Link } from 'react-router-dom'
interface Props {
    user: UserBase
    time: string
}
const AccountPosts: React.FC<Props> = ({ user, time }) => {
    return (
        <div>
            <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                    <div className='relative flex justify-center items-center'>
                        <svg className='w-[42px] h-[42px] absolute hidden'>
                            <linearGradient
                                id='my-gradient-posts'
                                x1='0%'
                                y1='100%'
                                x2='100%'
                                y2='0%'
                            >
                                <stop offset='5%' stopColor='#F4A14B' />
                                <stop offset='50%' stopColor='#E1306C' />
                                <stop offset='100%' stopColor='#A233FA' />
                            </linearGradient>
                            <circle
                                className='absolute inset-0'
                                cx='20.8'
                                cy='20.8'
                                r='18'
                                stroke='url(#my-gradient-posts)'
                                fill='#fff'
                                strokeWidth='2'
                            />
                        </svg>
                        <Link to={`/${user.userName}`}>
                            <Img
                                className='w-8 h-8 aspect-square object-cover relative z-10'
                                src={user.avatar}
                                alt={user.userName}
                                isCircle
                            />
                        </Link>
                    </div>
                    <div className='ml-3 flex items-center gap-1'>
                        <div className='font-semibold flex items-center'>
                            <UserName user={user} dropDow />
                            <span className='ml-1 mt-0.5'>
                                {user.verify && (
                                    <Icon
                                        className='text-primary text-sm'
                                        icon='ph:seal-check-fill'
                                    />
                                )}
                            </span>
                        </div>
                        <span className='font-normal text-gray-500 text-sm'>
                            • {formatTimeAgo(time)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountPosts
