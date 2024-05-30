import { UserBase } from '~/types/auth'
import Img from './Img'
import UserName from './UserName'
import React from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import { formatTimeAgo } from '~/utils/handleTime'
interface Props {
    content: {
        caption: string
        time: string
    }
    user: UserBase
}
const Caption: React.FC<Props> = ({ content, user }) => {
    const timeFormatted = formatTimeAgo(content.time)
    return (
        <div>
            <div className='flex gap-3 mt-3'>
                <div className='w-8 h-8 flex-shrink-0'>
                    <Img
                        src={user.avatar || '/avatar-empty.png'}
                        alt={user.fullName}
                        isCircle
                    />
                </div>
                <div className='flex-1 flex items-center gap-3 justify-between'>
                    <div className='text-sm'>
                        <div>
                            <div className='mr-2'>
                                <div className='flex item-center'>
                                    <UserName dropDow user={user} />
                                    {user.verify && (
                                        <Icon
                                            className='ml-1 text-primary'
                                            icon='ph:seal-check-fill'
                                        />
                                    )}
                                    <span className='pl-1 text-gray-500'>
                                        {timeFormatted}
                                    </span>
                                </div>
                            </div>
                            {content.caption}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Caption
