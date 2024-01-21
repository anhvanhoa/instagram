import { Icon } from '@iconify/react/dist/iconify.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { useNavigate, useParams } from 'react-router-dom'
import getOnePosts from '~/apis/getOnePosts'
import IconApp from '~/assets/icons/IconApp'
import AccountItem from '~/components/AccountItem'
import Img from '~/components/Img'
import Slider from '~/components/Slider'
import UserName from '~/components/UserName'
import Footer from '~/layouts/components/Footer'
import formatTimeAgo from '~/utils/handleTime'
import InputComment from '~/components/InputComment'
import { useLayoutEffect, useState } from 'react'
import commentPosts from '~/apis/commentPosts'
import useContextUser from '~/store/hook'
import likePosts from '~/apis/likePosts'
import dislikePosts from '~/apis/dislikePosts'
import socket from '~/socketIo'
import Comments from '~/components/Comments'
import SkeletonPostsPage from '~/components/SkeletonPostsPage'
import Tippy from '@tippyjs/react/headless'
import Wrapper from '~/components/Wrapper'
import Button from '~/components/Button'
import deletePosts from '~/apis/deletePosts'
import Alert from '~/components/Alert'
import EditPosts from '~/components/EditPosts'
import HeaderMobile from '~/components/HeaderMobile'
import NotFound from './NotFound'

const Posts = () => {
    const params = useParams()
    const { state: user } = useContextUser()
    const [comment, setComment] = useState('')
    const [confirm, setConfirm] = useState(false)
    const [edit, setEdit] = useState(false)
    const [listComment, setListComment] = useState<string[]>([])
    const [like, setLike] = useState(false)
    const navigate = useNavigate()
    const {
        data: posts,
        isError,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['posts', params.id],
        queryFn: () => getOnePosts(params.id || ''),
        refetchOnReconnect: false,
    })
    const { mutate: mutateComment } = useMutation({
        mutationFn: (data: { idPosts: string; content: string }) => commentPosts(data),
    })
    const { mutate } = useMutation({
        mutationFn: (idPosts: string) => likePosts({ idPosts }),
    })
    const { mutate: mutateDelete } = useMutation({
        mutationFn: (id: string) => deletePosts(id),
        onError: () => setConfirm(false),
        onSuccess: () => navigate('/'),
    })
    const { mutate: mutateDis } = useMutation({
        mutationFn: (idPosts: string) => dislikePosts({ idPosts }),
    })
    const apiLike = (idPosts: string) => () => {
        mutate(idPosts)
        setLike(true)
        socket.emit('like', { idPosts, fromUser: user._id, toUser: posts ? posts?.author._id : '' })
    }
    const apiDislike = (idPosts: string) => () => {
        mutateDis(idPosts)
        setLike(false)
    }
    const apiComment = (idPosts: string, content: string) => () => {
        socket.emit('comment', { idPosts, fromUser: user._id, toUser: posts ? posts?.author._id : '' })
        mutateComment(
            { content, idPosts },
            {
                onSuccess: () => {
                    setComment('')
                    setListComment((pre) => [...pre, comment])
                },
            },
        )
    }
    const apiDelete = (id: string) => () => mutateDelete(id)
    const cancel = () => setConfirm(false)
    const handleCloseEdit = () => setEdit(false)
    useLayoutEffect(() => {
        posts?.like && setLike(true)
        if (posts) socket.emit('joinRoom', posts.author._id)
        return () => {
            if (posts) socket.emit('leaveRoom', posts.author._id)
        }
    }, [posts])
    return (
        <div>
            {edit && posts && <EditPosts onSuccess={refetch} onClose={handleCloseEdit} posts={posts} />}
            {posts && confirm && (
                <Alert onCancel={cancel} title='Delete posts' textAgree='Delete' onAgree={apiDelete(posts._id)} />
            )}
            <div className='sticky top-0 z-50 bg-white md:hidden '>
                {posts && <HeaderMobile title={posts.title}></HeaderMobile>}
            </div>
            <div className='flex justify-center mx-0.5 xs:mx-4 sm:mx-8'>
                {isError && <NotFound />}
                {isLoading && <SkeletonPostsPage />}
                {posts && (
                    <div className='mt-0.5 xs:mt-6 justify-center overflow-hidden flex flex-col md:flex-row'>
                        <div
                            className={classNames(
                                'md:min-w-[350px] md:max-w-[550px] md:max-h-[550px]',
                                'flex items-center border border-r-0 border-r-transparent',
                            )}
                        >
                            <Slider maxElemnt={posts.contents.length}>
                                {posts.contents.map((img, index) => (
                                    <div key={index} className='flex-shrink-0 w-full'>
                                        <Img
                                            src={img}
                                            className='rounded-sm md:rounded-none md:max-h-[550px] md:min-h-[500px] object-contain w-full h-full'
                                        />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                        <div
                            className={classNames(
                                'flex-shrink-0 md:w-72 md:border relative overflow-y-auto bg-gray-50/50 md:bg-white',
                                'md:h-[550px] h-[450px] flex flex-col md:rounded-ee-lg md:rounded-se-lg rounded-sm',
                            )}
                        >
                            <div className='sticky top-0 bg-white'>
                                <div className='flex justify-between items-center md:px-4 px-2 py-4 md:py-3 border-b'>
                                    <AccountItem user={posts.author} size='small' />
                                    <Tippy
                                        trigger='click'
                                        interactive
                                        placement='bottom-end'
                                        render={() => (
                                            <Wrapper>
                                                <div className='bg-white rounded-xl px-2'>
                                                    <Button type='text' className='py-3 border-b'>
                                                        Copy link
                                                    </Button>
                                                    {user._id === posts.author._id && (
                                                        <div>
                                                            <Button
                                                                onClick={() => setEdit(true)}
                                                                type='text'
                                                                className='py-3 border-b'
                                                            >
                                                                Edit posts
                                                            </Button>
                                                            <Button
                                                                onClick={() => setConfirm(true)}
                                                                type='text'
                                                                className='py-3 text-red-500 hover:text-red-600'
                                                            >
                                                                Delete posts
                                                            </Button>
                                                        </div>
                                                    )}
                                                </div>
                                            </Wrapper>
                                        )}
                                    >
                                        <div>
                                            <Icon
                                                icon='solar:menu-dots-bold'
                                                className='cursor-pointer text-xl hover:bg-gray-100 px-1 rounded-md'
                                            />
                                        </div>
                                    </Tippy>
                                </div>
                            </div>
                            <div className='px-3 md:px-5 py-2 text-sm'>
                                <div className='text-ellipsis whitespace-nowrap overflow-hidden'>
                                    <div
                                        className={classNames('inline-block mr-1', {
                                            hidden: !posts.title,
                                        })}
                                    >
                                        <UserName user={posts.author} />
                                    </div>
                                    {posts.title}
                                </div>
                            </div>
                            <div className='pb-4 flex-1'>
                                <div className=''>
                                    {listComment.map((comment, index) => (
                                        <Comments key={index} comment={comment} user={user} />
                                    ))}
                                    {posts.comments.map((comment) => (
                                        <Comments key={comment._id} comment={comment.content} user={comment.userId} />
                                    ))}
                                </div>
                            </div>
                            <div className='sticky bottom-0 bg-white pt-4 border-t'>
                                <div className='flex items-center justify-between px-4'>
                                    <div className='flex items-center gap-4'>
                                        <span className='cursor-pointer'>
                                            {!like && (
                                                <div onClick={apiLike(posts._id)}>
                                                    <IconApp
                                                        type='heart-posts'
                                                        className={'transition-all w-6 hover:scale-110'}
                                                    />
                                                </div>
                                            )}
                                            {like && (
                                                <div onClick={apiDislike(posts._id)}>
                                                    <IconApp
                                                        type='heart-posts-red'
                                                        className={'transition-all w-6 hover:scale-110'}
                                                    />
                                                </div>
                                            )}
                                        </span>
                                        <span className='cursor-pointer transition-all w-6 hover:scale-110'>
                                            <IconApp type='share' />
                                        </span>
                                    </div>
                                    <div className='flex items-center'>
                                        <span className='cursor-pointer transition-all w-6 hover:scale-110'>
                                            <IconApp type='saved-posts' />
                                        </span>
                                    </div>
                                </div>
                                <div className='py-3 font-medium text-sm px-4 flex justify-between'>
                                    <p className='inline-block'>{posts.likes.length + (like ? 1 : 0)} likes</p>
                                    <p className='text-gray-500 text-xs'>{formatTimeAgo(posts.createdAt)}</p>
                                </div>
                            </div>
                            <div className='border-t px-2 py-2.5 bg-white'>
                                <InputComment
                                    comment={comment}
                                    setComment={setComment}
                                    positionSmile='left'
                                    apiComment={apiComment(posts._id, comment)}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className='mt-16'></div>
            <div className='mt-12 hidden md:block'>
                <Footer />
            </div>
        </div>
    )
}

export default Posts
