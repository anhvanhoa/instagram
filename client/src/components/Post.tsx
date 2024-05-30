import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import IconApp from '~/assets/icons/IconApp'
import UserName from './UserName'
import { ResponsePost } from '~/types/posts'
import Img from './Img'
import Slider from './Slider'
import classNames from 'classnames'
import socket from '~/socketIo'
import OptionPost from './OptionPost'
import AccountPosts from './AccountPosts'
import InteractPosts from './InteractPosts'
import InputComment from './InputComment'
import useAuth from '~/hooks/useAuth'
import useViewPost from '~/hooks/useViewPost'
import BoxListItem from './BoxListItem'
import usersLikeRequest from '~/apis/usersLikeRequest'
import useLikePost from '~/hooks/useLikePost'
import useComment from '~/hooks/useComment'
interface Props {
    posts: ResponsePost
}

const Post: React.FC<Props> = ({ posts }) => {
    const { user } = useAuth()
    const viewPost = useViewPost()
    const [post, setPost] = useState<ResponsePost>(posts)
    const [like, setLike] = useState(false)
    const [comment, setComment] = useState<string>('')
    const commentPost = useComment()
    const likePost = useLikePost()
    const handleLike = (type: 'like' | 'dislike') => () => {
        {
            setPost((pre) => {
                if (type === 'like') {
                    return {
                        ...pre,
                        isLike: !pre.isLike,
                        likeTotal: pre.likeTotal + 1,
                    }
                } else {
                    return {
                        ...pre,
                        isLike: !pre.isLike,
                        likeTotal: pre.likeTotal - 1,
                    }
                }
            })
            if (type === 'like') {
                likePost.mutate({ postId: post._id, type: 'like' })
                socket.emit('like', {
                    idPosts: post._id,
                    fromUser: user._id,
                    toUser: post.author._id,
                })
            } else likePost.mutate({ postId: post._id, type: 'dislike' })
        }
    }
    const handleComment = (idPosts: string, content: string) => () => {
        setComment('')
        socket.emit('comment', { idPosts, fromUser: user._id, toUser: post.author._id })
        commentPost.mutate(
            { content, postId: idPosts, parentId: null },
            {
                onSuccess: (payload) => {
                    setPost((pre) => {
                        if (pre.comments.length >= 2) pre.comments.shift()
                        return {
                            ...pre,
                            commentTotal: pre.commentTotal + 1,
                            comments: [...pre.comments, payload],
                        }
                    })
                },
            },
        )
    }

    const handleAnimationLike = () => {
        post.isLike || handleLike('like')()
        if (!like) {
            setLike(true)
            setTimeout(() => setLike(false), 4000)
        }
    }
    const handleViewPosts = () => viewPost(post._id)

    useEffect(() => {
        socket.emit('joinRoom', post.author._id)
        return () => {
            socket.emit('leaveRoom', post.author._id)
        }
    }, [post.author._id])
    return (
        <div className={classNames('mt-4 py-4 border-b border-second mb-8 sm:mb-6')}>
            <div className='px-2 pb-3 flex justify-between items-center'>
                <AccountPosts time={post.createdAt} user={post.author} />
                <OptionPost isViewPost postId={post._id} author={post.author} />
            </div>
            <div className='relative overflow-hidden'>
                {like && (
                    <IconApp
                        type='heart-solid'
                        className={classNames(
                            'text-white w-24 absolute z-10 top-1/2 left-1/2',
                            '-translate-x-1/2 -translate-y-[80%] pointer-events-none animate-shake-glide',
                        )}
                    />
                )}
                <div
                    className='rounded-md overflow-hidden'
                    onDoubleClick={handleAnimationLike}
                >
                    <Slider>
                        {post.media.map((element, index) => {
                            if (element.type_media === 'image')
                                return (
                                    <div key={index} className='flex-shrink-0 w-full'>
                                        <Img
                                            ratio={element.ratio}
                                            src={element.content}
                                            alt=''
                                            className='object-cover w-full'
                                        />
                                    </div>
                                )
                            else return <p key={index}>video</p>
                        })}
                    </Slider>
                </div>
                <div className='absolute top-0 hidden'>
                    <Icon icon='clarity:volume-mute-solid' />
                    <Icon icon='clarity:volume-up-solid' />
                </div>
            </div>
            <InteractPosts
                posts={{
                    _id: post._id,
                    isLike: post.isLike,
                }}
                handleDislike={handleLike('dislike')}
                handleLike={handleLike('like')}
                viewPosts={handleViewPosts}
            />
            <div className='mt-3 px-2'>
                <BoxListItem
                    title='Likes'
                    userName={post.author.userName}
                    queryKey='likes-posts'
                    fnFetch={() => usersLikeRequest(post._id)}
                    isHidden={!post.likeTotal}
                >
                    <div className='mb-2'>
                        <p className='text-sm font-semibold'>
                            {post.likeTotal ? (
                                <span className='inline-block'>
                                    {post.likeTotal > 1
                                        ? `${post.likeTotal} likes`
                                        : `${post.likeTotal} like`}
                                </span>
                            ) : (
                                <span className='inline-block'>
                                    Be the first to this like
                                </span>
                            )}
                        </p>
                    </div>
                </BoxListItem>

                <div
                    className={classNames('text-sm mb-2 line-clamp-2', {
                        hidden: !post.title,
                    })}
                >
                    <div className='inline-block pr-1'>
                        <UserName user={post.author} dropDow />
                    </div>
                    <span>{post.title}</span>
                </div>
                <div
                    className={classNames('mb-2', {
                        hidden: !post.commentTotal,
                    })}
                >
                    <p
                        className='text-[#737373] text-sm cursor-pointer hover:text-gray-600 inline-block'
                        onClick={handleViewPosts}
                    >
                        View all {post.commentTotal}
                        {post.commentTotal === 1 ? ' comment' : ' comments'}
                    </p>
                    {post.comments.map((item) => (
                        <div key={item._id} className='text-sm py-1 line-clamp-2'>
                            <span className='font-semibold mr-1'>
                                {item.user.userName}
                            </span>
                            <span>{item.content}</span>
                        </div>
                    ))}
                </div>
            </div>
            <InputComment
                comment={comment}
                setComment={setComment}
                positionSmile='right'
                loading={commentPost.isPending}
                handleComment={handleComment(post._id, comment)}
            />
        </div>
    )
}

export default Post
