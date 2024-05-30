import { useMutation } from '@tanstack/react-query'
import dislikePostRequest from '~/apis/dislikePostRequest'
import likePostRequest from '~/apis/likePostRequest'

const useLikePost = () => {
    const managerLike = useMutation({
        mutationFn: ({ postId, type }: { type: 'like' | 'dislike'; postId: string }) => {
            if (type === 'like') return likePostRequest({ postId })
            return dislikePostRequest({ postId })
        },
    })
    return managerLike
}

export default useLikePost
