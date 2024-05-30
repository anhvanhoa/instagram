import { Icon } from '@iconify/react/dist/iconify.js'
import { useQueryClient } from '@tanstack/react-query'
import classNames from 'classnames'
import { useParams } from 'react-router-dom'
import IconApp from '~/assets/icons/IconApp'
import AccountItem from '~/components/AccountItem'
import Img from '~/components/Img'
import Slider from '~/components/Slider'
import { formatTime } from '~/utils/handleTime'
import InputComment from '~/components/InputComment'
import { useEffect, useState } from 'react'
import useAuth from '~/hooks/useAuth'
import socket from '~/socketIo'
import Comments from '~/components/Comments'
import SkeletonPostsPage from '~/components/SkeletonPostsPage'
import HeaderMobile from '~/components/HeaderMobile'
import NotFound from './NotFound'
import OptionPost from '~/components/OptionPost'
import { copyLinkPost } from '~/utils/helper'
import BoxListItem from '~/components/BoxListItem'
import usersLikeRequest from '~/apis/usersLikeRequest'
import Caption from '~/components/Caption'
import useComment from '~/hooks/useComment'
import { Comment, ResponsePost } from '~/types/posts'
import useLikePost from '~/hooks/useLikePost'
import { usePost } from '~/hooks/post.hook'

type CommentPost = {
    content: string
    parent: {
        _id: string | null
        content: string
    }
}

const initComment = {
    content: '',
    parent: {
        _id: null,
        content: '',
    },
}

const Posts = () => {
    const params = useParams()
    const { user } = useAuth()
    const [comment, setComment] = useState<CommentPost>(initComment)
    const queryClient = useQueryClient()
    const post = usePost({ id: params.id! })
    const commentPost = useComment()
    const mangarLike = useLikePost()
    // Xử lý like hoặc dislike bài đăng
    const handleLikeOrDislike = (type: 'like' | 'dislike') => () => {
        {
            const isLike = type === 'like' ? true : false
            const likeTotal =
                type === 'like' ? post.data.likeTotal + 1 : post.data.likeTotal - 1
            const data = { ...post.data, isLike, likeTotal }
            queryClient.setQueryData<ResponsePost>(['post', post.data._id], data)
            const postId = post.data._id
            if (type === 'like') {
                mangarLike.mutate({ postId, type: 'like' })
                socket.emit('like', {
                    idPosts: postId,
                    fromUser: user._id,
                    toUser: post.data.author._id,
                })
            } else mangarLike.mutate({ postId, type: 'dislike' })
        }
    }
    // Xử lý nhập comment
    const changeComment = (value: string) => {
        setComment((pre) => ({ ...pre, content: value }))
    }
    // Hủy reply
    const closeReply = () => {
        setComment(initComment)
    }
    // Xử lý comment thành công
    const handleCommentSuccess = (data: Comment) => {
        if (data.parentId) {
            const commentsChildren =
                queryClient.getQueryData<Comment[]>([
                    'comments-children',
                    data.parentId,
                ]) || []
            if (commentsChildren.length)
                queryClient.setQueryData(
                    ['comments-children', data.parentId],
                    [data, ...commentsChildren],
                )
            else {
                const comments = post.data.comments.map((item) => {
                    if (item._id === data.parentId) {
                        return {
                            ...item,
                            replies: [data, ...item.replies],
                        }
                    }
                    return item
                })
                const commentTotal = post.data.commentTotal + 1
                queryClient.setQueryData(['post', post.data._id], {
                    ...post.data,
                    commentTotal: commentTotal,
                    comments: comments,
                })
            }
        } else {
            const commentTotal = post.data.commentTotal + 1
            queryClient.setQueryData(['post', post.data._id], {
                ...post.data,
                commentTotal: commentTotal,
                comments: [data, ...post.data.comments],
            })
        }
    }
    // Gửi comment
    const handleComment = () => {
        setComment(initComment)
        socket.emit('comment', {
            idPosts: post.data._id,
            fromUser: user._id,
            toUser: post.data.author._id,
        })
        commentPost.mutate(
            {
                content: comment.content,
                postId: post.data._id,
                parentId: comment.parent._id,
            },
            { onSuccess: handleCommentSuccess },
        )
    }
    // Copy link bài đăng
    const handleCopy = () => copyLinkPost(post.data._id)
    useEffect(() => {
        socket.emit('joinRoom', post.data.author._id)
        return () => {
            socket.emit('leaveRoom', post.data.author._id)
        }
    }, [post.data])

    if (post.isError) return <NotFound />
    return (
        <div className='h-full overflow-auto scrollbar'>
            <div className='sticky top-0 z-50 md:hidden'>
                <HeaderMobile title='Posts' />
            </div>
            <div className='flex justify-center mx-0.5 xs:mx-4 sm:mx-8 items-center'>
                {post.isFetching && <SkeletonPostsPage />}
                {!post.isFetching && (
                    <div className='w-full mt-0.5 xs:mt-6 justify-center overflow-hidden flex flex-col md:flex-row'>
                        <div
                            className={classNames(
                                'md:min-w-64 md:max-w-[600px] md:max-h-[600px] border-r-transparent',
                                'flex items-center md:border border-second border-r-0 rounded-s-2xl overflow-hidden',
                            )}
                        >
                            <div className='flex-1'>
                                <Slider>
                                    {post.data.media.map((item, index) => (
                                        <div key={index} className='flex-shrink-0 w-full'>
                                            <div className='md:max-h-[600px] md:min-h-[500px] flex items-center'>
                                                <Img
                                                    onDoubleClick={
                                                        !post.data.isLike
                                                            ? handleLikeOrDislike('like')
                                                            : undefined
                                                    }
                                                    ratio={item.ratio}
                                                    src={item.content}
                                                    className='rounded-sm md:rounded-none object-contain w-full h-full'
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                            <p></p>
                        </div>
                        <div
                            className={classNames(
                                'flex-shrink-0 md:w-80 md:border border-second',
                                'md:h-[600px] h-[450px] flex flex-col relative rounded-e-2xl',
                            )}
                        >
                            <div className='sticky top-0 z-30'>
                                <div className='flex justify-between items-center md:px-4 px-2 py-4 md:py-3 border-b border-second'>
                                    <div>
                                        <AccountItem
                                            user={post.data.author}
                                            size='small'
                                        />
                                    </div>
                                    <OptionPost
                                        author={post.data.author}
                                        postId={post.data._id}
                                        commentDisabled={post.data.commentDisable}
                                    />
                                </div>
                            </div>
                            <div className='pb-4 flex-1 overflow-auto scrollbar'>
                                {post.data.title && (
                                    <div className='px-3'>
                                        <Caption
                                            content={{
                                                caption: post.data.title,
                                                time: post.data.createdAt,
                                            }}
                                            user={post.data.author}
                                        />
                                    </div>
                                )}
                                {post.data.comments.length === 0 && (
                                    <p className='text-center mt-4'>No comments</p>
                                )}
                                <Comments
                                    comments={post.data.comments}
                                    handleReply={setComment}
                                />
                            </div>
                            <div className='bg-transparent pt-4 border-second border-t'>
                                <div className='flex items-center justify-between px-4'>
                                    <div className='flex items-center gap-4'>
                                        <span className='cursor-pointer' title='Like'>
                                            <div
                                                onClick={handleLikeOrDislike(
                                                    post.data.isLike ? 'dislike' : 'like',
                                                )}
                                            >
                                                <IconApp
                                                    type={
                                                        post.data.isLike
                                                            ? 'heart-posts-red'
                                                            : 'heart-posts'
                                                    }
                                                    className={
                                                        'transition-all w-6 hover:scale-110'
                                                    }
                                                />
                                            </div>
                                        </span>
                                        <span
                                            title='Share link'
                                            onClick={handleCopy}
                                            className='cursor-pointer transition-all w-6 hover:scale-110'
                                        >
                                            <IconApp type='share' />
                                        </span>
                                    </div>
                                    <div className='flex items-center' title='Save post'>
                                        <span className='cursor-pointer transition-all w-6 hover:scale-110'>
                                            <IconApp type='saved-posts' />
                                        </span>
                                    </div>
                                </div>
                                <div className='py-3 text-sm px-4'>
                                    <BoxListItem
                                        fnFetch={() => usersLikeRequest(post.data._id)}
                                        userName={post.data.author.userName}
                                        queryKey='posts'
                                        title='Likes'
                                        isHidden={post.data.likeTotal <= 0}
                                    >
                                        <div className='font-medium'>
                                            {post.data.likeTotal ? (
                                                <p className='inline-block cursor-pointer'>
                                                    {post.data.likeTotal > 1
                                                        ? `${post.data.likeTotal} likes`
                                                        : `${post.data.likeTotal} like`}
                                                </p>
                                            ) : (
                                                <p className='inline-block'>
                                                    Be the first to this like
                                                </p>
                                            )}
                                        </div>
                                    </BoxListItem>
                                    <p className='text-gray-500 text-xs'>
                                        {formatTime(post.data.createdAt)}
                                    </p>
                                </div>
                            </div>
                            <div className='px-2 pb-3 border-second'>
                                {comment.parent._id && (
                                    <p className='mb-1 rounded-md bg-gray-100 text-xs px-2 py-1 text-gray-500 flex justify-between items-center'>
                                        <span className='line-clamp-1'>
                                            Rely on {comment.parent.content}
                                        </span>
                                        <span
                                            className='cursor-pointer'
                                            onClick={closeReply}
                                        >
                                            <Icon
                                                icon='mdi:close'
                                                width='14'
                                                height='14'
                                            />
                                        </span>
                                    </p>
                                )}
                                {post.data.commentDisable || (
                                    <InputComment
                                        comment={comment.content}
                                        setComment={changeComment}
                                        positionSmile='right'
                                        handleComment={handleComment}
                                        loading={commentPost.isPending}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Posts
