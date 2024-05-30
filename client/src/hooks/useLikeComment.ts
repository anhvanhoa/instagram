import { useMutation } from '@tanstack/react-query'
import likeCommentRequest from '~/apis/likeCommentRequest'

const useLikeComment = (idComment: string) => {
    const likeComment = useMutation({
        mutationKey: ['like-comment', idComment],
        mutationFn: (idComment: string) => likeCommentRequest(idComment),
    })
    return likeComment
}

export default useLikeComment
