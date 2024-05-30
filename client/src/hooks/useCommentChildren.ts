import { useQuery } from '@tanstack/react-query'
import commentsChildrenRequest from '~/apis/commentsChildrenRequest'

const useCommentChildren = ({
    parentId,
    enabled = true,
}: {
    parentId: string
    enabled?: boolean
}) => {
    const commentsChildren = useQuery({
        queryKey: ['comments-children', parentId],
        queryFn: () => commentsChildrenRequest(parentId),
        enabled,
        initialData: [],
    })
    return commentsChildren
}

export default useCommentChildren
