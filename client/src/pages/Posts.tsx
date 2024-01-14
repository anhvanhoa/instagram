import { Icon } from '@iconify/react/dist/iconify.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { useParams } from 'react-router-dom'
import getOnePosts from '~/apis/getOnePosts'
import IconApp from '~/assets/icons/IconApp'
import AccountItem from '~/components/AccountItem'
import Img from '~/components/Img'
import LoadPage from '~/components/LoadPage'
import Slider from '~/components/Slider'
import UserName from '~/components/UserName'
import Footer from '~/layouts/components/Footer'
import formatTimeAgo from '~/utils/handleTime'
import InputComment from '~/components/InputComment'
import { useState } from 'react'
import commentPosts from '~/apis/commentPosts'
import useContextUser from '~/store/hook'
import likePosts from '~/apis/likePosts'
import dislikePosts from '~/apis/dislikePosts'
import socket from '~/socketIo'
import Comments from '~/components/Comments'
import SkeletonPostsPage from '~/components/SkeletonPostsPage'

const Posts = () => {
    const { state: user } = useContextUser()
    const [comment, setComment] = useState('')
    const [listComment, setListComment] = useState<string[]>([])
    const [like, setLike] = useState<boolean>(false)
    const params = useParams()
    const {
        data: posts,
        isError,
        isLoading,
    } = useQuery({
        queryKey: ['posts', params.id],
        queryFn: () => getOnePosts(params.id || ''),
    })
    const { mutate: mutateComment } = useMutation({
        mutationFn: (data: { idPosts: string; content: string }) => commentPosts(data),
    })
    const { mutate } = useMutation({
        mutationFn: (idPosts: string) => likePosts({ idPosts }),
    })
    const { mutate: mutateDis } = useMutation({
        mutationFn: (idPosts: string) => dislikePosts({ idPosts }),
    })
    const apiLike = (idPosts: string) => () => {
        mutate(idPosts)
        setLike(true)
        socket.emit('like', { idPosts, idUser: user._id, idUserNotify: posts ? posts?.author._id : '' })
    }
    const apiDislike = (idPosts: string) => () => {
        mutateDis(idPosts)
        setLike(false)
    }
    const apiComment = (idPosts: string, content: string) => () => {
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
    return (
        <div>
            <div className='flex justify-center'>
                {isError && <LoadPage />}
                {isLoading && <SkeletonPostsPage />}
                {posts && (
                    <div className='mt-6 justify-center overflow-hidden flex'>
                        <div
                            className={classNames('h-[600px]', `aspect-[${posts.typeAspect}]`, {
                                'aspect-square': !posts.typeAspect,
                            })}
                        >
                            <Slider maxElemnt={posts.contents.length}>
                                {posts.contents.map((img, index) => (
                                    <div key={index} className='flex-shrink-0 w-full'>
                                        <Img src={img} className='object-contain w-full h-full' />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                        <div className='overflow-hidden w-96 border relative overflow-y-auto flex flex-col h-full rounded-ee-lg rounded-se-lg'>
                            <div className='sticky top-0 bg-white'>
                                <div className='flex justify-between px-4 py-3 border-b'>
                                    <AccountItem user={posts.author} size='small' />
                                    <Icon icon='solar:menu-dots-broken' className='text-2xl' />
                                </div>
                            </div>
                            <div className='pb-4 flex-1'>
                                <div className=''>
                                    <div className='px-5 py-2 text-sm'>
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
                                    {listComment.map((comment, index) => (
                                        <Comments key={index} comment={comment} user={user} />
                                    ))}
                                    {posts.comments.map((comment) => (
                                        <Comments key={comment._id} comment={comment.content} user={comment.userId} />
                                    ))}
                                </div>
                            </div>
                            <div className='sticky bottom-0 bg-white pt-4 border-t shadow-lg'>
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
                                <div className='pt-2 font-medium text-sm px-4'>
                                    <p className='inline-block'>{posts.likes.length + (like ? 1 : 0)} </p> likes
                                </div>
                                <p className='text-gray-500 text-xs px-4 pb-3'>
                                    time: {formatTimeAgo(posts.createdAt)}
                                </p>
                                <div className='border-t px-4 py-2'>
                                    <InputComment
                                        comment={comment}
                                        setComment={setComment}
                                        positionSmile='left'
                                        apiComment={apiComment(posts._id, comment)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className='mt-12'>
                <Footer />
            </div>
        </div>
    )
}

export default Posts
