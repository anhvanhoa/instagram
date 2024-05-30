import React, { useState } from 'react'
import classNames from 'classnames'
import { PropsEditPost } from './EditPosts'
import { copyLinkPost } from '~/utils/helper'
import { Icon } from '@iconify/react/dist/iconify.js'
import Overlay from './Overlaying'
import useToast from '~/hooks/useToast.hook'
import { HandleName, InterOptionPost, initOptionPost } from '~/mock/optionPost'
import { useDeletePost } from '~/hooks/post.hook'
import { PropsUnfollow } from './Unfollow'
import { UserBase } from '~/types/auth'
import { PropsAlert } from './Alert'
import { PropsAboutAccount } from './AboutAccount'
import Options from './Options'
import Wrapper from './Wrapper'
import { useCommentDisable } from '~/hooks/comment.hook'

interface Props {
    isViewPost?: boolean
    postId: string
    author: UserBase
    commentDisabled?: boolean
    countLikeDisable?: boolean
}

type PropsElement = PropsEditPost | PropsUnfollow | PropsAlert | PropsAboutAccount

type Option = {
    data?: Array<InterOptionPost>
    element?: React.FC<PropsElement>
    handleName: HandleName
    title?: string
    subtitle?: string
}

const initOption: Option = {
    data: undefined,
    element: undefined,
    handleName: 'cancel',
    title: undefined,
    subtitle: undefined,
}

const OptionPost: React.FC<Props> = ({
    isViewPost = false,
    author,
    postId,
    commentDisabled,
}) => {
    const { addToast } = useToast()
    const [option, setOption] = useState<Option[]>(() => {
        initOption.data = initOptionPost({
            commentDisabled,
        })
        return [initOption]
    })
    const deletePost = useDeletePost()
    // Lấy ra phần tử cuối
    const CurentOption = option[option.length - 1]
    const comment = useCommentDisable({
        postId,
    })
    const handleCopy = () => {
        addToast({
            type: 'info',
            message: 'Copied to clipboard',
        })
        copyLinkPost(postId)
    }
    const handleDelete = () => deletePost.mutate(postId)
    // Xử lý khi click vào các option
    const handleClick = (name: HandleName, data?: Option) => () => {
        switch (name) {
            case 'copy': {
                handleCopy()
                break
            }
            case 'comment-disabled': {
                setOption((pev) => [
                    ...pev,
                    {
                        ...CurentOption,
                        data: initOptionPost({
                            commentDisabled: !commentDisabled,
                        }),
                    },
                ])
                comment.mutate({
                    postId,
                    commentDisable: !commentDisabled,
                })
                break
            }
            case 'about-accout':
            case 'share':
            case 'report':
            case 'delete':
            case 'unfollow':
            case 'edit': {
                data && setOption((pev) => [...pev, data])
                break
            }
            case 'go-post': // Chuyển link
            case 'cancel': // Tắt overlay
                break
            default:
                throw Error('Chưa khớp với case nào !')
        }
    }
    // Xử lý khi click với trở về
    const handleBack = () => {
        setOption((pev) => pev.slice(0, -1))
    }
    const handleDefault = () => setOption([initOption])

    return (
        <>
            <Overlay
                onClose={handleDefault}
                Component={
                    <Wrapper
                        classname={classNames({
                            'max-w-3xl': CurentOption.handleName === 'edit',
                            'max-w-sm': CurentOption.handleName !== 'edit',
                        })}
                    >
                        <Options<
                            InterOptionPost,
                            HandleName,
                            PropsEditPost | PropsUnfollow | PropsAlert | PropsAboutAccount
                        >
                            CurentOption={CurentOption}
                            author={author}
                            postId={postId}
                            handleClick={handleClick}
                            onBack={handleBack}
                            isShowTypeHidden={isViewPost}
                            propsElement={{
                                idPost: postId,
                                onClose: handleBack,
                                user: author,
                                head: {
                                    title: 'Delete posts',
                                    description:
                                        'Are you sure you want to delete this posts?',
                                },
                                agree: { text: 'Delete', handle: handleDelete },
                                cancel: { text: 'Back', handle: handleBack },
                            }}
                        />
                    </Wrapper>
                }
            >
                <Icon
                    icon='solar:menu-dots-bold'
                    className={classNames(
                        'cursor-pointer text-xl hover:dark:bg-second',
                        'hover:bg-gray-100 px-1 rounded-md',
                    )}
                />
            </Overlay>
        </>
    )
}

export default OptionPost
