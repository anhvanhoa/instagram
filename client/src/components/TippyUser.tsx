import Wrapper from '~/components/Wrapper'
import { User } from '~/types/auth'
import Button from '~/components/Button'
import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'
import IconApp from '~/assets/icons/IconApp'
import Img from './Img'
import useAuth from '~/hooks/useAuth'
import { usePosts } from '~/hooks/post.hook'

interface Props {
    account: User
    isFollow: boolean
    loading: boolean
    onFollow: () => void
    onUnFollow: () => void
}
const TippyUser = ({ account, onFollow, onUnFollow, isFollow, loading }: Props) => {
    const { user } = useAuth()
    const posts = usePosts({
        username: account.userName,
    })
    return (
        <Wrapper>
            <div className='bg-main border border-second w-[300px] rounded-xl'>
                <div className='flex items-center p-4'>
                    <div className='w-12 h-12'>
                        <Img
                            src={account.avatar || 'avatar-empty.png'}
                            alt={account.fullName}
                            isCircle
                        />
                    </div>
                    <div className='pl-4'>
                        <h4 className='font-bold'>{account.userName}</h4>
                        <p className='text-gray-500 text-sm font-normal'>
                            {account.fullName}
                        </p>
                    </div>
                </div>
                <div className='flex items-center justify-between mb-4 mx-5 text-xs *:font-medium'>
                    <div className='text-center'>
                        <p className='text-sm'>{account.totalPost}</p>
                        <p>posts</p>
                    </div>
                    <div className='text-center'>
                        <p className='text-sm'>{account.totalFollowers}</p>
                        <p>followers</p>
                    </div>
                    <div className='text-center'>
                        <p className='text-sm'>{account.totalFollowing}</p>
                        <p>following</p>
                    </div>
                </div>
                <div className='grid grid-cols-3 gap-1 px-1'>
                    {posts.data.length > 0 &&
                        posts.data.map((element, index) => (
                            <div className='w-full' key={index}>
                                <Link to={`/p/${element._id}`}>
                                    <Img
                                        src={element.media[0].content}
                                        alt=''
                                        className='w-full h-full object-cover aspect-square'
                                    />
                                </Link>
                            </div>
                        ))}
                </div>
                <div className='p-3'>
                    {!isFollow && user._id !== account._id && (
                        <Button
                            onClick={onFollow}
                            iconL={
                                loading && (
                                    <Icon
                                        icon='nonicons:loading-16'
                                        className='animate-spin text-white'
                                    />
                                )
                            }
                            className='w-full'
                        >
                            {!loading && <>{!isFollow && 'Follow'}</>}
                        </Button>
                    )}
                    {isFollow && user._id !== account._id && (
                        <div className='flex items-center gap-4'>
                            <div className='w-full'>
                                <Link
                                    to={`/message/${account.userName}/t/${account._id}`}
                                >
                                    <Button
                                        iconL={<IconApp type='message' className='w-4' />}
                                        className='w-full'
                                    >
                                        Message
                                    </Button>
                                </Link>
                            </div>
                            <Button
                                onClick={onUnFollow}
                                type={'second'}
                                className='w-full'
                            >
                                Following
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </Wrapper>
    )
}

export default TippyUser
