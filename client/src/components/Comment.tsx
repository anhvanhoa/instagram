import { useEffect, useState } from 'react'
import IconApp from '~/assets/icons/IconApp'
import UserName from './UserName'
import { Comment as CommentType } from '~/types/posts'
import Img from './Img'
import { Icon } from '@iconify/react/dist/iconify.js'
import { formatTimeAgo } from '~/utils/handleTime'
import OptionComment from './OptionComment'
import useLikeComment from '~/hooks/useLikeComment'
import useDisLikeComment from '~/hooks/useDislikeComment'
import { Link } from 'react-router-dom'
import useCommentChildren from '~/hooks/useCommentChildren'

type CommentPost = {
    content: string
    parent: {
        _id: string | null
        content: string
    }
}

type Props = {
    comment: CommentType
    handleReply?: (commentPost: CommentPost) => void
    isShowReply?: boolean
}

const Comment = ({ comment, handleReply, isShowReply }: Props) => {
    const timeFormatted = formatTimeAgo(comment.createdAt)
    const [like, setLike] = useState({
        isLike: comment.isLike,
        countLike: comment.countLike,
    })
    const [showComment, setShowComment] = useState(false)
    const likeComment = useLikeComment(comment._id)
    const dislikeComment = useDisLikeComment(comment._id)
    const commentsChildren = useCommentChildren({
        parentId: comment._id,
        enabled: false,
    })
    const handleShowReply = () => {
        !showComment && commentsChildren.refetch()
        setShowComment(!showComment)
    }
    const handleLikeOrDislikeSuccess = () =>
        setLike({
            isLike: !like.isLike,
            countLike: like.isLike ? like.countLike - 1 : like.countLike + 1,
        })
    const handleLikeOrDislike = () => {
        if (!like.isLike)
            likeComment.mutate(comment._id, {
                onSuccess: handleLikeOrDislikeSuccess,
            })
        if (like.isLike)
            dislikeComment.mutate(comment._id, {
                onSuccess: handleLikeOrDislikeSuccess,
            })
    }

    const clickReply = (commentPost: CommentPost) => () => {
        handleReply && handleReply(commentPost)
    }

    useEffect(() => {
        if (isShowReply) {
            setShowComment(true)
            commentsChildren.refetch()
        }
    }, [isShowReply, commentsChildren])
    return (
        <div className='px-3 mt-4 flex gap-3 mb-3'>
            <div className='w-8 h-8 flex-shrink-0'>
                <Img
                    src={comment.user.avatar || '/avatar-empty.png'}
                    alt={comment.user.fullName}
                    isCircle
                />
            </div>
            <div className='text-sm flex-1'>
                <div className='group/comment'>
                    <div className='flex items-center justify-between gap-2'>
                        <div>
                            <div className='mr-2'>
                                <div className='flex item-center'>
                                    <UserName dropDow user={comment.user} />
                                    {comment.user.verify && (
                                        <Icon
                                            className='ml-1 text-primary'
                                            icon='ph:seal-check-fill'
                                        />
                                    )}
                                    <span className='pl-1 text-gray-500'>
                                        {timeFormatted}
                                    </span>
                                </div>
                            </div>
                            <p className='break-all'>
                                <ContentComment content={comment.content} />
                            </p>
                        </div>
                        <div
                            className='flex-shrink-0  px-0.5'
                            onClick={handleLikeOrDislike}
                        >
                            <IconApp
                                type={like.isLike ? 'heart-posts-red' : 'heart-posts'}
                                className='size-3.5 cursor-pointer'
                            />
                        </div>
                    </div>
                    <div className='flex items-center text-xs gap-2 text-gray-500 *:cursor-pointer mt-0.5'>
                        {Boolean(like.countLike) && (
                            <p className='font-medium'>
                                <span>
                                    {like.countLike > 1
                                        ? `${like.countLike} likes`
                                        : `${like.countLike} like`}
                                </span>
                            </p>
                        )}
                        {Boolean(handleReply) && (
                            <label
                                onClick={clickReply({
                                    content: `@${comment.user.userName} `,
                                    parent: {
                                        _id: comment._id,
                                        content: comment.content,
                                    },
                                })}
                                htmlFor='comment'
                                className='font-medium'
                            >
                                <p>reply</p>
                            </label>
                        )}
                        {Boolean(!handleReply) && (
                            <p className='font-medium opacity-50 pointer-events-none'>
                                reply
                            </p>
                        )}
                        <OptionComment
                            idComment={comment._id}
                            userId={comment.user._id}
                        />
                    </div>
                </div>
                {Boolean(comment.countChildren) && (
                    <p
                        onClick={handleShowReply}
                        className='cursor-pointer text-xs mt-2 text-gray-400'
                    >
                        ___________
                        <span className='px-2'>
                            {showComment ? (
                                'Hide replies'
                            ) : (
                                <span>
                                    View
                                    {comment.countChildren > 1
                                        ? ` ${comment.countChildren} replies`
                                        : ` ${comment.countChildren} reply`}
                                </span>
                            )}
                        </span>
                    </p>
                )}
                {showComment &&
                    commentsChildren.data.map((comment) => (
                        <div key={comment._id} className='-mx-3'>
                            <Comment comment={comment} />
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default Comment

const ContentComment = ({ content }: { content: string }) => {
    const arr = content.split('')
    const contentConvert = arr.reduce<(string | JSX.Element)[]>((acc, item, index) => {
        const str = acc.join('')
        if (item === ' ' && str.includes('@')) {
            acc = []
            const E = (
                <Link key={index} className='mr-1 text-primary' to={`/${str.slice(1)}`}>
                    {str}
                </Link>
            )
            acc.push(E)
        } else acc.push(item)
        return acc
    }, [])
    return contentConvert
}
