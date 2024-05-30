import { useMutation } from '@tanstack/react-query'
import commentRequest from '~/apis/commentRequest'
import { CommentCreate } from '~/types/posts'

const useComment = () => {
    const commentPost = useMutation({
        mutationKey: ['create-comment-post'],
        mutationFn: (data: CommentCreate) => commentRequest(data),
    })
    return commentPost
}

export default useComment
