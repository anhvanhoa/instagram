import Wrapper from '~/components/Wrapper'
import { User } from '~/types/auth'
import Button from '~/components/Button'
import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'
import images from '~/assets'
import IconApp from '~/assets/icons/IconApp'
import Img from './Img'

interface Props {
    data: User
    isFollow: boolean
    loading: boolean
    onFollow: () => void
    onUnFollow: () => void
}
const TippyUser = ({ data, onFollow, onUnFollow, isFollow, loading }: Props) => {
    return (
        <Wrapper>
            <div className='bg-white w-[350px] rounded-xl'>
                <div className='flex items-center p-4'>
                    <Img className='w-12 h-12 rounded-[50%]' src={data.avatar || images.noAvatar} alt='' />
                    <div className='pl-4'>
                        <h4 className='font-bold'>{data.userName}</h4>
                        <p className='text-gray-500 text-sm font-normal'>{data.fullName}</p>
                    </div>
                </div>
                <div className='flex items-center justify-between mb-4 mx-5 text-sm'>
                    <div className='text-center'>
                        <p className='font-bold'>{data.posts.length}</p>
                        <p>posts</p>
                    </div>
                    <div className='text-center'>
                        <p className='font-bold'>{data.followers.length}</p>
                        <p>followers</p>
                    </div>
                    <div className='text-center'>
                        <p className='font-bold'>{data.following.length}</p>
                        <p>following</p>
                    </div>
                </div>
                <div className='grid grid-cols-3 gap-1'>
                    {data.posts.length > 0 &&
                        data.posts.map((element, index) => (
                            <Link key={index} to='/' className='aspect-square'>
                                <Img src={element.contents[0]} alt='' className='w-full h-full object-cover' />
                            </Link>
                        ))}
                </div>
                <div className='p-3'>
                    {!isFollow && (
                        <Button
                            onClick={onFollow}
                            iconL={loading && <Icon icon='nonicons:loading-16' className='animate-spin text-white' />}
                            className='w-full'
                        >
                            {!loading && <>{!isFollow && 'Theo dõi'}</>}
                        </Button>
                    )}
                    {isFollow && (
                        <div className='flex items-center gap-4'>
                            <div className='w-full'>
                                <Link to={`/message/${data.userName}/t/${data._id}`}>
                                    <Button iconL={<IconApp type='message' />} className='w-full'>
                                        Message
                                    </Button>
                                </Link>
                            </div>
                            <Button onClick={onUnFollow} type={'second'} className='w-full hover:bg-[#dbdbdb]'>
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
