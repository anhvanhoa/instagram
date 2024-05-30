import { Posts } from '~/types/posts'
import AccountItem from './AccountItem'
import classNames from 'classnames'
import Slider from './Slider'
import Img from './Img'
import Button from './Button'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { stopPropagation } from '~/utils/helper'
import { initPost } from '~/constants/post'
import { useEditPost, usePost } from '~/hooks/post.hook'

export interface PropsEditPost {
    onEdit?: (isEddit: boolean) => void
    idPost: string
    onClose: () => void
    isStopPropagation?: boolean
}
const EditPosts: React.FC<PropsEditPost> = ({ idPost, onClose, isStopPropagation }) => {
    const [post, setPost] = useState(initPost)
    const queryClient = useQueryClient()
    const postRequest = usePost({
        id: idPost,
        queryKey: ['post-edit'],
    })
    const editPost = useEditPost(idPost)

    const handleSuccessEditPost = (payload: Posts) => {
        onClose()
        queryClient.fetchQuery({
            queryKey: ['post', payload._id],
        })
    }
    const handleEditPost = () =>
        editPost.mutate(post, {
            onSuccess: handleSuccessEditPost,
        })
    const handleChange =
        (name: keyof Posts) =>
        (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setPost((pre) => ({ ...pre, [name]: event.target.value }))
        }

    useEffect(() => {
        setPost(postRequest.data)
    }, [postRequest.data])
    return (
        <div
            onClick={stopPropagation(isStopPropagation)}
            className='rounded-xl overflow-hidden'
        >
            <div className='flex py-2 px-4 justify-between bg-white dark:bg-zinc-900'>
                <Button
                    disable={editPost.isPending}
                    onClick={onClose}
                    type='text'
                    className='text-red-500'
                >
                    Back
                </Button>
                <h3 className='leading-8 font-semibold'>Edit posts</h3>
                <Button
                    className='w-8'
                    disable={editPost.isPending}
                    loading={editPost.isPending}
                    onClick={handleEditPost}
                    type='text'
                >
                    Done
                </Button>
            </div>
            <div className='justify-center overflow-hidden flex flex-col md:flex-row'>
                <div
                    className={classNames(
                        'bg-white dark:bg-zinc-900 md:min-w-[350px] md:max-w-[550px] md:max-h-[550px] flex items-center border border-r-0 border-r-transparent dark:border-gray-700',
                    )}
                >
                    <Slider>
                        {post.media.map((item, index) => (
                            <div key={index} className='flex-shrink-0 w-full'>
                                <Img
                                    src={item.content}
                                    className='rounded-sm md:rounded-none h-[400px] md:max-h-[550px] md:min-h-[500px] object-contain w-full'
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
                <div
                    className={classNames(
                        'flex-shrink-0 md:w-72 border overflow-y-auto bg-white dark:bg-zinc-900',
                        'h-52 md:h-[550px] flex flex-col dark:border-gray-700',
                    )}
                >
                    <div className='sticky top-0 bg-white dark:bg-zinc-900'>
                        <div className='flex justify-between items-center px-4 py-3 border-b dark:border-gray-700'>
                            <AccountItem user={post.author} size='small' />
                        </div>
                    </div>
                    <div className='pb-4 flex-1'>
                        <div className='mt-2 px-2'>
                            <textarea
                                onChange={handleChange('title')}
                                placeholder='What are you thinking ?'
                                className='w-full h-24 md:h-36 resize-none p-1 text-gray-500 outline-none focus:text-black/80 dark:focus:text-white bg-transparent'
                                defaultValue={post.title}
                            ></textarea>
                        </div>
                        <div className='flex justify-between px-4 text-gray-500'>
                            <p className='text-xs'>{post.title.length}/2.200</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditPosts
