import React, { Fragment, useState } from 'react'
import { ResponseUsers, UserBase } from '~/types/auth'
import useAuth from '~/hooks/useAuth'
import AccountItem from './AccountItem'
import Button from './Button'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import showManyFollow from '~/apis/showManyFollow'
import { Icon } from '@iconify/react/dist/iconify.js'
import Overlay from './Overlaying'
import Wrapper from './Wrapper'
import Unfollow, { PropsUnfollow } from './Unfollow'
import RemoveFollowers, { PropsRemoveFollowers } from './RemoveFollowers'
import { stopPropagation } from '~/utils/helper'
import { useFollow, useSuccessUpdateMe } from '~/hooks/follow.hook'

type Btn = 'Follow' | 'Following' | 'Remove' | 'Hide'

interface Props {
    title: string
    userName: string
    fnFetch: () => Promise<ResponseUsers> | ResponseUsers
    children?: React.ReactNode
    queryKey?: string
    isHidden?: boolean
}

const BoxListItem: React.FC<Props> = ({
    title,
    userName,
    fnFetch,
    children,
    queryKey = '',
}) => {
    const { user } = useAuth()
    const [overlay, setOverlay] = useState<boolean>(true)
    const [compo, setCompo] = useState<{
        Element?: React.FC<PropsUnfollow | PropsRemoveFollowers>
        props: PropsUnfollow | PropsRemoveFollowers
    }>({
        Element: undefined,
        props: {
            user: {
                _id: '',
                avatar: '',
                fullName: '',
                userName: '',
                verify: false,
            },
        },
    })
    const queryClient = useQueryClient()
    const handleOverlay = (isOVerlay: boolean) => () => {
        setCompo((pre) => ({ ...pre, Element: undefined }))
        setOverlay(isOVerlay)
    }
    const success = useSuccessUpdateMe()
    const follow = useFollow({ userName: user.userName })
    const showMany = useMutation({
        mutationKey: ['show-many-follow', userName],
        mutationFn: (ids: string[]) => showManyFollow(ids),
    })
    const users = useQuery({
        queryKey: [queryKey, userName],
        queryFn: async () => {
            const data = await fnFetch()
            const ids = data?.users.map((item) => item._id) || []
            showMany.mutate(ids)
            return data
        },
        enabled: overlay,
    })

    const handleClose = () => {
        setCompo((pre) => ({ ...pre, Element: undefined }))
    }
    const handleElement = (type: Btn, user: UserBase) => () => {
        if (type === 'Remove')
            setCompo({
                Element: RemoveFollowers,
                props: {
                    user,
                    onClose: handleClose,
                    onSuccess: () => {
                        handleClose()
                        success.successRemove()
                        for (const key in showMany!.data) {
                            if (
                                Object.prototype.hasOwnProperty.call(showMany!.data, key)
                            ) {
                                if (key === user._id)
                                    showMany!.data[key].isFollowing = false
                            }
                        }
                        queryClient.setQueryData(
                            ['show-many-follow', userName],
                            showMany.data,
                        )
                    },
                },
            })
        if (type === 'Following')
            setCompo({
                Element: Unfollow,
                props: {
                    user,
                    onClose: handleClose,
                    onSuccess: () => {
                        handleClose()
                        success.successUnfollow()
                    },
                },
            })
        if (type === 'Follow') follow.mutate(user._id)
    }
    return (
        <div>
            <Overlay
                onClose={handleOverlay(false)}
                Component={
                    <Wrapper isStopPropagation classname='max-w-sm'>
                        {compo.Element && <compo.Element {...compo.props} />}
                        {!compo.Element && (
                            <Fragment>
                                <div onClick={stopPropagation(true)}>
                                    <h2 className='text-center py-2.5 border-b text-base font-semibold'>
                                        <span>{title}</span>
                                    </h2>
                                    <div className='pt-2 pb-2 px-4 max-h-80 overflow-y-auto scrollbar'>
                                        {users.isLoading && (
                                            <div className='mt-8'>
                                                <Icon
                                                    className='size-8 mx-auto'
                                                    icon='eos-icons:loading'
                                                />
                                            </div>
                                        )}
                                        {showMany.data &&
                                            users.data?.users.map((userItem) => {
                                                return (
                                                    <Account
                                                        onClick={handleElement(
                                                            'Hide',
                                                            userItem,
                                                        )}
                                                        user={userItem}
                                                        key={userItem._id}
                                                        btn={'Hide'}
                                                    />
                                                )
                                            })}
                                    </div>
                                </div>
                            </Fragment>
                        )}
                    </Wrapper>
                }
            >
                <span onClick={handleOverlay(true)}>{children}</span>
            </Overlay>
        </div>
    )
}

export default BoxListItem

const Account = ({
    user,
    onClick,
    btn = 'Hide',
}: {
    user: UserBase
    onClick?: () => void
    btn?: Btn
}) => {
    const types: Record<string, 'primary' | 'second'> = {
        Follow: 'primary',
        Following: 'second',
        Remove: 'second',
    }
    return (
        <div className='py-2 flex items-center justify-between'>
            <AccountItem user={user} />
            <Button
                isHidden={btn === 'Hide'}
                onClick={onClick}
                size='small'
                type={types[btn]}
                className='max-w-20'
            >
                {btn}
            </Button>
        </div>
    )
}
