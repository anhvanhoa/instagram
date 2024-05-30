import React from 'react'
import { Comment as CommentType } from '~/types/posts'
import Comment from './Comment'
type CommentPost = {
    content: string
    parent: {
        _id: string | null
        content: string
    }
}
interface Props {
    comments: CommentType[]
    handleReply?: (commentPost: CommentPost) => void
}
const Comments: React.FC<Props> = ({ comments, handleReply }) => {
    return (
        <div className='px-0.5'>
            {comments.map((comment) => (
                <Comment
                    key={comment._id}
                    comment={comment}
                    isShowReply={Boolean(comment.replies.length)}
                    handleReply={handleReply}
                />
            ))}
        </div>
    )
}

export default Comments
