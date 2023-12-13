import { User } from '~/types/auth'
import { Icon } from '@iconify/react'
interface Props {
    user: User
}
const AccountItem: React.FC<Props> = ({ user }) => {
    return (
        <div className='flex items-center justify-between'>
            <div className='flex'>
                <div className='relative flex justify-center items-center'>
                    <svg className='w-14 h-14 absolute '>
                        <linearGradient id='my-gradient' x1='0%' y1='100%' x2='100%' y2='0%'>
                            <stop offset='5%' stopColor='#F4A14B' />
                            <stop offset='50%' stopColor='#E1306C' />
                            <stop offset='100%' stopColor='#A233FA' />
                        </linearGradient>
                        <circle
                            className='absolute inset-0'
                            cx='27.5'
                            cy='27.5'
                            r='24'
                            stroke='url(#my-gradient)'
                            fill='#fff'
                            strokeWidth='1.5'
                        />
                    </svg>
                    <img
                        className='rounded-[50%] w-11 h-11 aspect-square object-cover relative z-10 p-px'
                        src={user.avatar}
                        alt={user.userName}
                    />
                </div>
                <div className='ml-3'>
                    <div className='text-sm font-semibold flex items-center'>
                        <h3>{user.userName}</h3>
                        <span className='ml-1'>
                            {user.verify && <Icon className='text-primary' icon='ph:seal-check-fill' />}
                        </span>
                    </div>
                    <div className='text-sm'>
                        <h4>{user.fullName}</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountItem
