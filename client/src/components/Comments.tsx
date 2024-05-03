import React from 'react'
import Img from './Img'
import UserName from './UserName'
import { User } from '~/types/auth'
import { Icon } from '@iconify/react/dist/iconify.js'
import formatTimeAgo from '~/utils/handleTime'
interface Props {
    comment: string
    time: string
    user: User
}
const Comments: React.FC<Props> = ({ comment, user, time }) => {
    const timeFormatted = formatTimeAgo(time)
    return (
        <div>
            <div className='px-4 mt-3 flex gap-3 mb-4'>
                <Img src={user.avatar} alt={user.fullName} className='w-8 h-8 rounded-[50%] flex-shrink-0' />
                <div className='text-sm'>
                    <div>
                        <div className='inline-block mr-2'>
                            <div className='flex item-center'>
                                <UserName dropDow user={user} />
                                {user.verify && <Icon className='ml-1 text-primary' icon='ph:seal-check-fill' />}
                            </div>
                        </div>
                        {comment}
                    </div>
                    <div className='flex items-center text-xs gap-2 text-gray-500'>
                        <p className=''>{timeFormatted}</p>
                        {/* <p className='font-medium'>reply</p> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comments
