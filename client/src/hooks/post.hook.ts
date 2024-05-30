import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import deletePostRequest from '~/apis/deletePostRequest'
import editPostRequest from '~/apis/editPostRequest'
import getPost from '~/apis/getPost'
import postsMeRequest from '~/apis/postsMeRequest'
import suggestPosts from '~/apis/suggestsPost'
import { initPost } from '~/constants/post'
import { Posts } from '~/types/posts'

const useDeletePost = () => {
    const navigate = useNavigate()
    return useMutation({
        mutationFn: (id: string) => deletePostRequest(id),
        onSuccess: () => navigate('/'),
    })
}

const usePost = ({ id, queryKey = [] }: { id: string; queryKey?: string[] }) => {
    const navigate = useNavigate()
    const post = useQuery({
        queryKey: ['post', ...queryKey, id],
        queryFn: async () => {
            const post = await getPost(id)
            if (typeof post === 'string') {
                navigate(`/${post}`)
                return initPost
            }
            return post
        },
        initialData: initPost,
        refetchOnWindowFocus: false,
    })
    return post
}

const useEditPost = (postId: string) => {
    return useMutation({
        mutationKey: ['edit-post', postId],
        mutationFn: (post: Pick<Posts, '_id' | 'title'>) =>
            editPostRequest({
                _id: post._id,
                title: post.title,
            }),
    })
}

const useSuggestPosts = ({ limit = 9 }: { limit: number }) => {
    return useQuery({
        queryKey: ['suggest-posts', limit],
        queryFn: () => suggestPosts(limit),
        refetchOnWindowFocus: false,
    })
}

const usePosts = ({ username }: { username: string }) => {
    return useQuery({
        queryKey: ['posts-user', username],
        queryFn: () =>
            postsMeRequest({
                username,
            }),
        initialData: [],
        enabled: Boolean(username),
        refetchOnWindowFocus: false,
    })
}

export { useDeletePost, usePost, useEditPost, useSuggestPosts, usePosts }
