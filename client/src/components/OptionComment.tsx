import { FC, useState } from 'react'
import OverLay from './OverLay'
import classNames from 'classnames'
import Button from './Button'
import { Icon } from '@iconify/react/dist/iconify.js'
import Alert from './Alert'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import deleteCommentRequest from '~/apis/deleteCommentRequest'
import useAuth from '~/hooks/useAuth'
import { useParams } from 'react-router-dom'
import { ResponsePost } from '~/types/posts'
interface Props {
    idComment: string
    userId: string
}
const OptionComment: FC<Props> = ({ idComment, userId }) => {
    const { user } = useAuth()
    const [overlay, setOverlay] = useState<boolean>(false)
    const [confirm, setConfirm] = useState(false)
    const params = useParams()
    const queryClient = useQueryClient()
    const changeOverlay = (isOvelay: boolean) => () => {
        setOverlay(isOvelay)
    }
    const handleConfirm = (confirm: boolean) => () => {
        setOverlay(!confirm)
        setConfirm(confirm)
    }
    const deleteComment = useMutation({
        mutationKey: ['delete-comment', idComment],
        mutationFn: (id: string) => deleteCommentRequest(id),
    })
    const handleDelete = () => {
        deleteComment.mutate(idComment, {
            onSuccess: (id) => {
                setConfirm(false)
                const post = queryClient.getQueryData<ResponsePost>(['posts', params.id])
                const comments = post?.comments.filter((item) => item._id !== id)
                queryClient.setQueryData(['posts', params.id], { ...post, comments })
            },
        })
    }
    return (
        <div>
            <div>
                {confirm && (
                    <Alert
                        head={{
                            title: 'Delete comment',
                            description: 'Are you sure delete this comment?',
                        }}
                        agree={{ text: 'Delete', handle: handleDelete }}
                        cancel={{ text: 'Cancel', handle: handleConfirm(false) }}
                    ></Alert>
                )}
            </div>
            {overlay && (
                <OverLay onClose={changeOverlay(false)}>
                    <div
                        className={classNames(
                            'xs:w-96 rounded-xl flex flex-col *:font-normal',
                            'dark:bg-zinc-900 dark:hover:*:text-white dark:*:text-white dark:*:border-gray-50/10',
                            'hover:*:text-black *:text-black bg-third ',
                        )}
                    >
                        {user._id === userId && (
                            <Button
                                onClick={handleConfirm(true)}
                                type='text'
                                className='py-3 !text-red-500 !hover:text-red-600 !font-medium border-b'
                            >
                                Delete comment
                            </Button>
                        )}
                        {user._id !== userId && (
                            <Button
                                disable
                                onClick={handleConfirm(true)}
                                type='text'
                                className='py-3 !text-red-500 !hover:text-red-600 !font-medium border-b'
                            >
                                Report
                            </Button>
                        )}
                        <Button
                            onClick={changeOverlay(false)}
                            type='text'
                            className='py-3'
                        >
                            Cancel
                        </Button>
                    </div>
                </OverLay>
            )}
            <div onClick={changeOverlay(true)}>
                <p className='translate-y-0.5 ml-4 group-hover/comment:block hidden'>
                    <Icon icon='solar:menu-dots-bold' width='16' height='16' />
                </p>
            </div>
        </div>
    )
}

export default OptionComment
