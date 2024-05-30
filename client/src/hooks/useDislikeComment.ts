import { useMutation } from '@tanstack/react-query'
import dislikeCommentRequest from '~/apis/dislikeCommentRequest'

const useDisLikeComment = (idComment: string) => {
    const dislikeComment = useMutation({
        mutationKey: ['dislike-comment', idComment],
        mutationFn: (idComment: string) => dislikeCommentRequest(idComment),
    })
    return dislikeComment
}

export default useDisLikeComment
