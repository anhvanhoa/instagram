import { Link, useNavigate, useParams } from 'react-router-dom'
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
// import NotFound from './NotFound'
import Tippy from '@tippyjs/react/headless'
import BoxMenu from '~/layouts/components/BoxMenu'
import HeaderMobile from '~/components/HeaderMobile'

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
            {/* {(!data || isLoading) && <NotFound />} */}
            {data && (
                <div className='max-w-[975px] mx-auto md:pt-[30px] flex flex-col h-screen'>
                    <HeaderMobile
                        className='md:hidden'
                        title={data.fullName}
                        contextNext={
                            <Tippy trigger='click' interactive render={() => <BoxMenu />}>
                                <div className='cursor-pointer'>
                                    <IconApp type='setting' />
                                </div>
                            </Tippy>
                        }
                    />
                    <div className='mb-6 bg-white flex justify-between px-4 md:hidden'></div>
                    <div className='flex justify-start md:justify-center px-4 sm:px-8 mb-4 sm:mb-11'>
                        <div className='mr-7 sm:mr-16 relative'>
                            <div className='w-20 h-20 sm:w-[170px] sm:h-[170px] mx-auto'>
                                <Img
                                    src={data.avatar}
                                    alt={data.userName}
                                    className='w-full h-full object-cover rounded-[50%]'
                                />
                                <div className=' absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden'>
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
                        <div>
                            <div className='flex-col flex sm:flex-row gap-3 items-start sm:items-center'>
                                <div className='sm:font-semibold flex items-center pr-6'>
                                    <h2 className='text-xl md:text-2xl'>{data.userName}</h2>
                                    <span className='ml-1 mt-0.5'>
                                        {data.verify && (
                                            <Icon className='text-primary text-sm mt-1' icon='ph:seal-check-fill' />
                                        )}
                                    </span>
                                </div>
                                <div className='flex gap-3'>
                                    <div>
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
                                    </div>
                                    {isFollowing && (
                                        <Button
                                            onClick={apiUnFollow(data._id)}
                                            className='text-red-500 bg-red-500/10'
                                            size='small'
                                            type='second'
                                        >
                                            Unfollow
                                        </Button>
                                    )}
                                </div>
                            </div>
                            <div className='w-full mb-4'></div>
                            <div>
                                <div className='sm:flex items-center mb-3 hidden my-4'>
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
                                <div className='text-sm hidden sm:block'>
                                    <p className='font-semibold'>{data.fullName}</p>
                                    <div className='mt-2'>{data.bio}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='sm:hidden'>
                        <div className='text-sm px-4 sm:px-8'>
                            <p className='font-semibold'>{data.fullName}</p>
                            <div className='mt-2'>{data.bio}</div>
                        </div>
                        <div className='grid grid-cols-3 text-sm border-t border-second mt-6 py-3'>
                            <div>
                                <p className='pr-1 text-center font-semibold'>{data.posts.length}</p>
                                <p className='text-center text-gray-500'>posts</p>
                            </div>
                            <div>
                                <p className='pr-1 text-center font-semibold'>{data.followers.length}</p>
                                <p className='text-center text-gray-500'>followers</p>
                            </div>
                            <div>
                                <p className='pr-1 text-center font-semibold'>{data.following.length}</p>
                                <p className='text-center text-gray-500'>following</p>
                            </div>
                        </div>
                    </div>
                    <div className='border-t border-second flex-1 flex flex-col pt-1 sm:pt-6 md:pt-8 px-1'>
                        <div className='grid grid-cols-2 sm:grid-cols-3 gap-px sm:gap-1 sm:px-8'>
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
                                    <Img
                                        src={post.contents[0]}
                                        alt={post.title}
                                        className='aspect-square object-cover rounded-sm'
                                    />
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
                            {!data.posts.length && (
                                <p className='col-span-3 text-center mt-10 text-xl'>There are no posts</p>
                            )}
                        </div>
                        <div className='flex-1'></div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Profile
