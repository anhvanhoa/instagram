import { User } from '~/types/auth'
import { Icon } from '@iconify/react'
import classNames from 'classnames'
import UserName from './UserName'
import Img from './Img'
import { Link } from 'react-router-dom'

type Size = 'small' | 'medium' | 'big'
interface Props {
    user: User
    size?: Size
}
const AccountItem: React.FC<Props> = ({ user, size = 'medium' }) => {
    const avatarSize: Record<Size, string> = {
        small: 'w-8 h-8',
        big: 'w-14 h-14',
        medium: 'w-11 h-11',
    }
    const storySize: Record<Size, string> = {
        small: 'w-[42px] h-[42px]',
        medium: 'w-14 h-14',
        big: 'w-16 h-16',
    }
    type CircleSize = {
        x: number
        y: number
        r: number
    }
    const circleSize: Record<Size, CircleSize> = {
        medium: {
            r: 24,
            y: 27.8,
            x: 28,
        },
        small: {
            r: 18,
            x: 20.8,
            y: 21.5,
        },
        big: {
            r: 30,
            y: 32,
            x: 31.9,
        },
    }
    return (
        <div className='flex items-center justify-between'>
            <div className='flex items-center'>
                <div className='relative flex justify-center items-center'>
                    <svg className={classNames('absolute hidden', storySize[size])}>
                        <linearGradient id='my-gradient-avatar' x1='0%' y1='100%' x2='100%' y2='0%'>
                            <stop offset='5%' stopColor='#F4A14B' />
                            <stop offset='50%' stopColor='#E1306C' />
                            <stop offset='100%' stopColor='#A233FA' />
                        </linearGradient>
                        <circle
                            className='absolute inset-0'
                            cx={circleSize[size].x}
                            cy={circleSize[size].y}
                            r={circleSize[size].r}
                            stroke='url(#my-gradient-avatar)'
                            fill='#fff'
                            strokeWidth='2'
                        />
                    </svg>
                    <Link to={`/${user.userName}`}>
                        <Img
                            className={classNames(
                                'rounded-[50%] aspect-square object-cover relative z-10',
                                avatarSize[size],
                            )}
                            src={user.avatar}
                            alt={user.userName}
                        />
                    </Link>
                </div>
                <div
                    className={classNames({
                        'ml-5': size === 'medium' || size === 'big',
                        'ml-2': size === 'small',
                    })}
                >
                    <div className='text-sm font-semibold flex items-center'>
                        <UserName user={user} dropDow />
                        <span className='ml-1'>
                            {user.verify && <Icon className='text-primary' icon='ph:seal-check-fill' />}
                        </span>
                    </div>
                    <div
                        className={classNames({
                            'text-sm': size !== 'small',
                            'text-xs': size === 'small',
                        })}
                    >
                        <h4>{user.fullName}</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountItem
