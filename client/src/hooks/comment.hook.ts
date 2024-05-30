import { useMutation, useQueryClient } from '@tanstack/react-query'
import commentDisablePost from '~/apis/commentDisablePost'
import { ResponsePost } from '~/types/posts'

const useCommentDisable = ({ postId }: { postId: string }) => {
    const queryClient = useQueryClient()
    const disableComment = useMutation({
        mutationFn: (body: { postId: string; commentDisable: boolean }) =>
            commentDisablePost(body),
        onSuccess: () => {
            queryClient.setQueryData(['post', postId], (prev: ResponsePost) => {
                return {
                    ...prev,
                    commentDisable: !prev.commentDisable,
                }
            })
        },
    })
    return disableComment
}

export { useCommentDisable }
