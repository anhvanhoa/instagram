import { Link } from 'react-router-dom'
interface Props {
    avatar: string
    userName: string
    isStory: boolean
    to: string
}
const StoryItem = ({ avatar, userName, isStory, to }: Props) => {
    return (
        <Link to={to} className='flex flex-col items-center px-1 w-[66px] relative'>
            <div className='flex items-center justify-center  mt-1 mb-2'>
                <img src={avatar} alt={userName} className='w-12 h-12 object-cover rounded-[50%] z-10 ' />
                <div className='absolute hidden'>
                    <svg width={64} height={64}>
                        <linearGradient id='my-gradient' x1='0%' y1='100%' x2='100%' y2='0%'>
                            <stop offset='5%' stopColor='#F4A14B' />
                            <stop offset='50%' stopColor='#E1306C' />
                            <stop offset='100%' stopColor='#A233FA' />
                        </linearGradient>
                        <circle
                            cx={32}
                            cy={32}
                            r={31}
                            stroke={isStory ? 'url(#my-gradient)' : '#DBDBDB'}
                            strokeWidth={isStory ? 2 : 1}
                            fill='transparent'
                        />
                    </svg>
                </div>
            </div>
            <div className='max-w-[74px] whitespace-nowrap'>
                <p className='px-0.5 text-xs text-gray-500 text-ellipsis overflow-hidden'>{userName}</p>
            </div>
        </Link>
    )
}

export default StoryItem
