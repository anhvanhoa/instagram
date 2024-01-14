import React from 'react'
import Img from './Img'
import UserName from './UserName'
import { User } from '~/types/auth'
interface Props {
    comment: string
    user: User
}
const Comments: React.FC<Props> = ({ comment, user }) => {
    return (
        <div>
            <div className='px-4 mt-3 flex gap-3 mb-3'>
                <Img src={user.avatar} alt={user.fullName} className='w-8 h-8 rounded-[50%] flex-shrink-0' />
                <div className='text-sm'>
                    <div>
                        <div className='inline-block mr-1'>
                            <UserName dropDow user={user} />
                        </div>
                        {comment}
                    </div>
                    <div className='gap-2 text-gray-500 mt-1 hidden'>
                        <p>now</p>
                        <p className='font-medium'>reply</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comments
