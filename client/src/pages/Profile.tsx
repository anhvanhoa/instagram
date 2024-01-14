import { Link, NavLink, useNavigate, useParams } from 'react-router-dom'
import classNames from 'classnames'
import { Icon } from '@iconify/react'
import Button from '~/components/Button'
import IconApp from '~/assets/icons/IconApp'
import { useMutation, useQuery } from '@tanstack/react-query'
import getUser from '~/apis/getUser'
import Img from '~/components/Img'
import useContextUser from '~/store/hook'
import infoUser from '~/apis/infoUser'
import { initializeUser } from '~/store/constant'
import follow from '~/apis/follow'
import unfollow from '~/apis/unfollow'
import SkeletonExploreItem from '~/components/SkeletonExploreItem'

const Profile = () => {
    const navigate = useNavigate()
    const { state } = useContextUser()
    const { username } = useParams<{ username: string }>()
    const { data, isLoading } = useQuery({
        queryKey: ['profile', username],
        queryFn: () => getUser(username || ''),
    })
    const {
        data: { isFollowing },
        refetch,
    } = useQuery({
        queryKey: ['check-info', username],
        queryFn: () => infoUser(username || ''),
        initialData: { ...initializeUser, isFollowing: false, isFollower: false },
    })
    const handleApi = () => refetch()
    const { mutate } = useMutation({
        mutationFn: (id: string) => follow(id),
        onSuccess: handleApi,
    })
    const { mutate: mutateUn } = useMutation({
        mutationFn: (id: string) => unfollow(id),
        onSuccess: handleApi,
    })
    const apiFollow = (id: string) => () => mutate(id)
    const apiUnFollow = (id: string) => () => mutateUn(id)
    const viewPosts = (link: string) => async () =>
        navigate('/p/' + link, {
            preventScrollReset: true,
        })
    return (
        <div>
            {data && (
                <div className='max-w-[975px] mx-auto pt-[30px] px-5'>
                    <div className='flex items-start mb-11'>
                        <div className='w-[31%] mr-[30px] relative'>
                            <div className='w-[150px] h-[150px] mx-auto'>
                                <Img
                                    src={data.avatar}
                                    alt={data.userName}
                                    className='w-full h-full object-cover rounded-[50%]'
                                />
                                <div className=' absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '>
                                    <svg width={165} height={165}>
                                        <linearGradient id='my-gradient' x1='0%' y1='100%' x2='100%' y2='0%'>
                                            <stop offset='5%' stopColor='#F4A14B' />
                                            <stop offset='50%' stopColor='#E1306C' />
                                            <stop offset='100%' stopColor='#A233FA' />
                                        </linearGradient>
                                        <circle
                                            cx={82.5}
                                            cy={82.8}
                                            r={78}
                                            stroke='url(#my-gradient)'
                                            fill='transparent'
                                            strokeWidth={3}
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className='flex-1'>
                            <div className='flex items-center'>
                                <div className='font-semibold flex items-center pr-6'>
                                    <h2 className='text-xl'>{data.userName}</h2>
                                    <span className='ml-1 mt-0.5'>
                                        {data.verify && (
                                            <Icon className='text-primary text-sm' icon='ph:seal-check-fill' />
                                        )}
                                    </span>
                                </div>
                                <div className='flex gap-3'>
                                    {data.userName === state.userName && (
                                        <Link to='/accounts/edit'>
                                            <Button type='second'>Edit profile</Button>
                                        </Link>
                                    )}
                                    {!isFollowing && data.userName !== state.userName && (
                                        <Button onClick={apiFollow(data._id)} size='small'>
                                            Follow
                                        </Button>
                                    )}
                                    {data.userName !== state.userName && (
                                        <Link to={`/message/${data.userName}/t/${data._id}`}>
                                            <Button type={isFollowing ? 'primary' : 'second'} size='small'>
                                                Message
                                            </Button>
                                        </Link>
                                    )}
                                    {isFollowing && (
                                        <Button
                                            onClick={apiUnFollow(data._id)}
                                            className='text-red-500'
                                            size='small'
                                            type='text'
                                        >
                                            Unfollow
                                        </Button>
                                    )}
                                </div>
                            </div>
                            <div className='w-full mb-4'></div>
                            <div className='flex items-center mb-3'>
                                <p className='mr-10'>
                                    <span className='pr-1 font-semibold'>{data.posts.length}</span>
                                    posts
                                </p>
                                <p className='mr-10'>
                                    <span className='pr-1 font-semibold'>{data.followers.length}</span>
                                    followers
                                </p>
                                <p className='mr-10'>
                                    <span className='pr-1 font-semibold'>{data.following.length}</span>
                                    following
                                </p>
                            </div>
                            <div className='text-sm'>
                                <p className='font-semibold'>{data.fullName}</p>
                                <div className='mt-2'>{data.bio}</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='flex justify-center items-center border-t border-[#ccc]'>
                            <NavLink
                                to={`/${data.userName}`}
                                className={({ isActive }) =>
                                    classNames('flex items-center mr-[60px] py-5 border-t', {
                                        'border-black': isActive,
                                        'border-transparent': !isActive,
                                    })
                                }
                            >
                                <span className='text-xs'>
                                    <Icon icon='mdi:grid' />
                                </span>
                                <span className='uppercase text-xs font-medium px-1'>posts</span>
                            </NavLink>
                            <NavLink
                                to={`/${data.userName}/saved`}
                                className={({ isActive }) =>
                                    classNames('flex items-center mr-[60px] py-5 border-t', {
                                        'border-black': isActive,
                                        'border-transparent': !isActive,
                                    })
                                }
                            >
                                <span className=''>
                                    <Icon icon='fluent:bookmark-16-regular' />
                                </span>
                                <span className='uppercase text-xs font-medium px-1'>Saved</span>
                            </NavLink>
                            <NavLink
                                className={({ isActive }) =>
                                    classNames('flex items-center py-5 border-t', {
                                        'border-black': isActive,
                                        'border-transparent': !isActive,
                                    })
                                }
                                to={`/${data.userName}/tagged`}
                            >
                                <span>
                                    <Icon icon='ph:user-square' />
                                </span>
                                <span className='uppercase text-xs font-medium px-1'>Tagged</span>
                            </NavLink>
                        </div>
                        <div className='grid grid-cols-3 gap-2'>
                            {isLoading && (
                                <>
                                    <SkeletonExploreItem />
                                    <SkeletonExploreItem />
                                    <SkeletonExploreItem />
                                </>
                            )}
                            {data.posts.map((post, index) => (
                                <div
                                    key={index}
                                    className='relative group/posts cursor-pointer'
                                    onClick={viewPosts(post._id)}
                                >
                                    <Img src={post.contents[0]} alt='' className='aspect-square object-cover' />
                                    {post.contents.length > 1 && (
                                        <Icon className='text-2xl text-white absolute top-3 right-3' icon='ion:copy' />
                                    )}
                                    <div className='bg-black/30 absolute inset-0 hidden group-hover/posts:flex justify-center items-center gap-8 text-white'>
                                        <div className='flex items-center gap-1'>
                                            <IconApp type='heart-posts' /> {post.likes.length}
                                        </div>
                                        <div className='flex items-center gap-1'>
                                            <IconApp type='comment' />
                                            {post.comments.length}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {!data.posts.length && <p className='text-center mt-10 text-xl'>There are no posts</p>}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Profile
