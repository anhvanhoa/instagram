import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import IconApp from '~/assets/icons/IconApp'
import { User } from '~/types/auth'
import UserName from './UserName'
import { Posts as PostsType } from '~/types/posts'
import { useMutation } from '@tanstack/react-query'
import likePosts from '~/apis/likePosts'
import dislikePosts from '~/apis/dislikePosts'
import commentPosts from '~/apis/commentPosts'
import Img from './Img'
import Slider from './Slider'
import classNames from 'classnames'
import socket from '~/socketIo'
import useContextUser from '~/store/hook'
import { useNavigate } from 'react-router-dom'
import OptionPost from './OptionPost'
import AccountPosts from './AccountPosts'
import InteractPosts from './InteractPosts'
import InputComment from './InputComment'
interface Props {
    user: User
    posts: PostsType
}
const Posts: React.FC<Props> = ({ user, posts }) => {
    const { state } = useContextUser()
    const navigate = useNavigate()
    const [like, setLike] = useState<boolean>(false)
    const [comment, setComment] = useState<string>('')
    const [listComment, setListComment] = useState<string[]>([])
    const { mutate } = useMutation({
        mutationFn: (idPosts: string) => likePosts({ idPosts }),
    })
    const { mutate: mutateDis } = useMutation({
        mutationFn: (idPosts: string) => dislikePosts({ idPosts }),
    })
    const { mutate: mutateComment } = useMutation({
        mutationFn: (data: { idPosts: string; content: string }) => commentPosts(data),
    })
    const apiLike = (idPosts: string) => () => {
        mutate(idPosts)
        setLike(true)
        socket.emit('like', { idPosts, fromUser: state._id, toUser: user._id })
    }
    const apiDislike = (idPosts: string) => () => {
        mutateDis(idPosts)
        setLike(false)
    }
    const apiComment = (idPosts: string, content: string) => () => {
        socket.emit('comment', { idPosts, fromUser: state._id, toUser: user._id })
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
    const viewPosts = (link: string) => () =>
        navigate('/p/' + link, {
            preventScrollReset: true,
        })
    useEffect(() => {
        socket.emit('joinRoom', user._id)
        return () => {
            socket.emit('leaveRoom', user._id)
        }
    })
    return (
        <div className={classNames('mt-4 py-4 border-b border-second mb-8 sm:mb-6')}>
            <div className='px-2 pb-3 flex justify-between items-center'>
                <AccountPosts time={posts.createdAt} user={user} />
                <OptionPost viewPosts={viewPosts(posts._id)}>
                    <Icon
                        icon='solar:menu-dots-bold'
                        className='cursor-pointer text-xl hover:dark:bg-second hover:bg-gray-100 px-1 rounded-md'
                    />
                </OptionPost>
            </div>
            <div className='relative'>
                <IconApp
                    type='heart-solid'
                    className={classNames(
                        'text-white w-20 absolute z-10 top-1/2 left-1/2',
                        '-translate-x-1/2 -translate-y-1/2 pointer-events-none',
                        { 'animate-show': like, hidden: !like },
                    )}
                />
                <div className='rounded-md overflow-hidden' onDoubleClick={apiLike(posts._id)}>
                    <Slider maxElemnt={posts.contents.length}>
                        {posts.contents.map((element, index) => (
                            <Img key={index} src={element} alt='' className='object-cover' />
                        ))}
                    </Slider>
                </div>
                <div className='absolute top-0 hidden'>
                    <Icon icon='clarity:volume-mute-solid' />
                    <Icon icon='clarity:volume-up-solid' />
                </div>
            </div>
            <InteractPosts
                like={like}
                apiDislike={apiDislike(posts._id)}
                apiLike={apiLike(posts._id)}
                viewPosts={viewPosts(posts._id)}
            />
            <div className='mt-3 px-2'>
                <div className='mb-2'>
                    <p className='text-sm font-semibold'>{posts.likes.length + (like ? 1 : 0)} likes</p>
                </div>
                <div
                    className={classNames('text-sm mb-2', {
                        hidden: !posts.title,
                    })}
                >
                    <div className='inline-block pr-1'>
                        <UserName user={user} dropDow />
                    </div>
                    <span>{posts.title}</span>
                </div>
                <div
                    className={classNames('mb-2', {
                        hidden: !posts.comments.length,
                    })}
                >
                    {listComment.map((item, i) => (
                        <div className='text-sm py-1'>
                            <span className='font-semibold mr-1'>{state.userName}</span>
                            <span key={i} onClick={viewPosts(posts._id)}>
                                {item}
                            </span>
                        </div>
                    ))}
                    <p
                        className='text-[#737373] text-sm cursor-pointer hover:text-gray-600 inline-block'
                        onClick={viewPosts(posts._id)}
                    >
                        View all {posts.comments.length + listComment.length} comments
                    </p>
                </div>
            </div>
            <InputComment
                comment={comment}
                setComment={setComment}
                positionSmile='right'
                apiComment={apiComment(posts._id, comment)}
            />
        </div>
    )
}

export default Posts
