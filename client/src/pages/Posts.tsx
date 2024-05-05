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
import formatTimeAgo from '~/utils/handleTime'
import InputComment from '~/components/InputComment'
import { useLayoutEffect, useState } from 'react'
import commentRequest from '~/apis/commentRequest'
import useContextUser from '~/store/hook'
import likePostRequest from '~/apis/likePostRequest'
import dislikePostRequest from '~/apis/dislikePostRequest'
import socket from '~/socketIo'
import Comments from '~/components/Comments'
import SkeletonPostsPage from '~/components/SkeletonPostsPage'
import Tippy from '@tippyjs/react/headless'
import Wrapper from '~/components/Wrapper'
import Button from '~/components/Button'
import deletePostRequest from '~/apis/deletePostRequest'
import Alert from '~/components/Alert'
import EditPosts from '~/components/EditPosts'
import HeaderMobile from '~/components/HeaderMobile'
import NotFound from './NotFound'

const Posts = () => {
    const params = useParams()
    const { user } = useContextUser()
    const [comment, setComment] = useState('')
    const [confirm, setConfirm] = useState(false)
    const [edit, setEdit] = useState(false)
    const [listComment, setListComment] = useState<
        {
            comment: string
            createdAt: string
        }[]
    >([])
    const [like, setLike] = useState(false)
    const navigate = useNavigate()
    const url = `${location.origin}/p/${params.id}`
    const handleCopy = () => navigator.clipboard.writeText(url)
    const posts = useQuery({
        queryKey: ['posts', params.id],
        queryFn: () => getOnePosts(params.id || ''),
        refetchOnReconnect: false,
    })
    const commentPost = useMutation({
        mutationFn: (data: { idPosts: string; content: string }) => commentRequest(data),
    })
    const likePost = useMutation({
        mutationFn: (idPosts: string) => likePostRequest({ idPosts }),
    })
    const deletePost = useMutation({
        mutationFn: (id: string) => deletePostRequest(id),
        onError: () => setConfirm(false),
        onSuccess: () => navigate('/'),
    })

    const dislikePost = useMutation({
        mutationFn: (idPosts: string) => dislikePostRequest({ idPosts }),
    })
    const apiLike = (idPosts: string) => () => {
        likePost.mutate(idPosts)
        setLike(true)
        socket.emit('like', { idPosts, fromUser: user._id, toUser: posts.data ? posts.data.author._id : '' })
    }
    const apiDislike = (idPosts: string) => () => {
        dislikePost.mutate(idPosts)
        setLike(false)
    }
    const apiComment = (idPosts: string, content: string) => () => {
        socket.emit('comment', { idPosts, fromUser: user._id, toUser: posts.data ? posts.data.author._id : '' })
        commentPost.mutate(
            { content, idPosts },
            {
                onSuccess: () => {
                    setComment('')
                    setListComment((pre) => [
                        ...pre,
                        {
                            comment,
                            createdAt: new Date().toISOString(),
                        },
                    ])
                },
            },
        )
    }
    const apiDelete = (id: string) => () => deletePost.mutate(id)
    const cancel = () => setConfirm(false)
    const handleCloseEdit = () => setEdit(false)
    useLayoutEffect(() => {
        posts.data?.like && setLike(true)
        if (posts.data) socket.emit('joinRoom', posts.data.author._id)
        return () => {
            if (posts.data) socket.emit('leaveRoom', posts.data.author._id)
        }
    }, [posts])
    return (
        <div className='h-full overflow-auto scrollbar'>
            {edit && posts.data && <EditPosts onSuccess={posts.refetch} onClose={handleCloseEdit} posts={posts.data} />}
            {posts.data && confirm && (
                <Alert onCancel={cancel} title='Delete posts' textAgree='Delete' onAgree={apiDelete(posts.data._id)} />
            )}
            <div className='sticky top-0 z-50 md:hidden '>
                {posts.data && <HeaderMobile title={posts.data.title}></HeaderMobile>}
            </div>
            <div className='flex justify-center mx-0.5 xs:mx-4 sm:mx-8 items-center'>
                {posts.isError && <NotFound />}
                {posts.isLoading && <SkeletonPostsPage />}
                {posts.data && (
                    <div className='mt-0.5 xs:mt-6 justify-center overflow-hidden flex flex-col md:flex-row'>
                        <div
                            className={classNames(
                                'md:min-w-64 md:max-w-[600px] md:max-h-[600px]',
                                'flex items-center md:border border-second border-r-0 border-r-transparent',
                            )}
                        >
                            <Slider maxElemnt={posts.data.contents.length}>
                                {posts.data.contents.map((img, index) => (
                                    <div key={index} className='flex-shrink-0 w-full'>
                                        <Img
                                            src={img}
                                            className='rounded-sm md:rounded-none md:max-h-[600px] md:min-h-[500px] object-contain w-full h-full'
                                        />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                        <div
                            className={classNames(
                                'flex-shrink-0 md:w-80 md:border border-second relative',
                                'md:h-[600px] h-[450px] flex flex-col md:rounded-ee-lg md:rounded-se-lg rounded-sm',
                            )}
                        >
                            <div className='sticky top-0'>
                                <div className='flex justify-between items-center md:px-4 px-2 py-4 md:py-3 border-b border-second'>
                                    <div className='relative'>
                                        <AccountItem user={posts.data.author} size='small' />
                                    </div>
                                    <Tippy
                                        trigger='click'
                                        interactive
                                        placement='bottom-end'
                                        render={() => (
                                            <Wrapper>
                                                <div className='bg-main rounded-xl px-2 border border-second'>
                                                    <Button onClick={handleCopy} type='text' className='py-3'>
                                                        Copy link
                                                    </Button>
                                                    {user._id === posts.data.author._id && (
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
                                                className='cursor-pointer text-xl hover:bg-gray-100 hover:dark:bg-second px-1 rounded-md'
                                            />
                                        </div>
                                    </Tippy>
                                </div>
                            </div>
                            <div className='px-3 md:px-5 py-2 text-sm'>
                                <div className='text-ellipsis whitespace-nowrap overflow-hidden'>
                                    <div
                                        className={classNames('inline-block mr-1', {
                                            hidden: !posts.data.title,
                                        })}
                                    >
                                        <UserName user={posts.data.author} />
                                    </div>
                                    {posts.data.title}
                                </div>
                            </div>
                            <div className='pb-4 flex-1'>
                                <div className=''>
                                    {listComment.map((comment, index) => (
                                        <Comments
                                            key={index}
                                            time={comment.createdAt}
                                            comment={comment.comment}
                                            user={user}
                                        />
                                    ))}
                                    {posts.data.comments.map((comment) => (
                                        <Comments
                                            key={comment._id}
                                            time={comment.createdAt}
                                            comment={comment.content}
                                            user={comment.userId}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className='sticky bottom-0 bg-transparent pt-4 border-second border-t'>
                                <div className='flex items-center justify-between px-4'>
                                    <div className='flex items-center gap-4'>
                                        <span className='cursor-pointer'>
                                            {!like && (
                                                <div onClick={apiLike(posts.data._id)}>
                                                    <IconApp
                                                        type='heart-posts'
                                                        className={'transition-all w-6 hover:scale-110'}
                                                    />
                                                </div>
                                            )}
                                            {like && (
                                                <div onClick={apiDislike(posts.data._id)}>
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
                                    <p className='inline-block'>{posts.data.likes.length + (like ? 1 : 0)} likes</p>
                                    <p className='text-gray-500 text-xs'>{formatTimeAgo(posts.data.createdAt)}</p>
                                </div>
                            </div>
                            <div className='border-t px-2 py-2.5 border-second'>
                                <InputComment
                                    comment={comment}
                                    setComment={setComment}
                                    positionSmile='left'
                                    apiComment={apiComment(posts.data._id, comment)}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Posts
