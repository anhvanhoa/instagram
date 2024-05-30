import Button from './Button'
import Overlay from './Overlaying'
import { Icon } from '@iconify/react/dist/iconify.js'
import Wrapper from './Wrapper'
import React, { useState } from 'react'
import { PropsAboutAccount } from './AboutAccount'
import { PropsAlert } from './Alert'
import Options from './Options'
import { HandleName, initOptionProfile, InterOptionProfile } from '~/mock/optionProfile'
import { UserBase } from '~/types/auth'
import useToast from '~/hooks/useToast.hook'
import { useLogout } from '~/hooks/auth.hook'
import { useBlock, useUnblock } from '~/hooks/user.hook'
interface Props {
    isFollower: boolean
    isBlock: boolean
    handleRemoveFollower: () => void
    viewer: UserBase
}

type PropsElement = PropsAlert | PropsAboutAccount

type Option = {
    data?: Array<InterOptionProfile>
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

const OptionProfile: React.FC<Props> = ({
    viewer,
    isFollower,
    handleRemoveFollower,
    isBlock,
}) => {
    const [option, setOption] = useState<Option[]>(() => {
        initOption.data = initOptionProfile({ isBlock })
        return [initOption]
    })
    const CurentOption = option[option.length - 1]
    const { addToast } = useToast()
    const logout = useLogout()
    const blockUser = useBlock({ username: viewer.userName })
    const unblock = useUnblock({ username: viewer.userName })
    const copyUrlCurrent = () => {
        addToast({
            type: 'info',
            message: 'Copied to clipboard',
        })
        const url = window.location.href
        navigator.clipboard.writeText(url)
    }
    const time = new Date().toISOString()
    const handleUnblock = () => {
        unblock.mutate(viewer._id)
        setOption(() => {
            initOption.data = initOptionProfile({ isBlock: false })
            return [initOption]
        })
    }

    const handleLogout = () => logout.mutate(time)
    const handleBlock = () => {
        blockUser.mutate(viewer._id)
        setOption(() => {
            initOption.data = initOptionProfile({ isBlock: true })
            return [initOption]
        })
    }
    const handleClick = (name: HandleName, data?: Option) => () => {
        switch (name) {
            case 'block':
            case 'about-accout':
            case 'share-account':
            case 'report': {
                data && setOption((pev) => [...pev, data])
                break
            }
            case 'copy':
                copyUrlCurrent()
                break
            case 'logout':
                handleLogout()
                break
            case 'settings':
                break
            case 'remove-follower':
                handleRemoveFollower()
                break
            case 'unblock':
                handleUnblock()
                break
            case 'cancel':
                break
            default:
                throw Error('Chưa khớp với case nào !')
        }
    }
    const handleBack = () => {
        setOption((pev) => pev.slice(0, -1))
    }
    const handleDefault = () => setOption([initOption])
    return (
        <React.Fragment>
            <Overlay
                onClose={handleDefault}
                Component={
                    <Wrapper classname='max-w-sm'>
                        <Options<
                            InterOptionProfile,
                            HandleName,
                            PropsAlert | PropsAboutAccount
                        >
                            handleClick={handleClick}
                            CurentOption={CurentOption}
                            onBack={handleBack}
                            author={viewer}
                            isShowTypeHidden={isFollower}
                            propsElement={{
                                onClose: handleDefault,
                                isStopPropagation: true,
                                head: {
                                    title: `Block ${viewer.userName}`,
                                    description:
                                        "They won't be able to find your profile, posts or story on Instagram. Instagram won't let them know you blocked them.",
                                },
                                agree: { text: 'Block', handle: handleBlock },
                                cancel: { text: 'Cancel', handle: handleBack },
                            }}
                        />
                    </Wrapper>
                }
            >
                <Button size='custom' type='second'>
                    <Icon icon='gg:menu-right' className='size-5' />
                </Button>
            </Overlay>
        </React.Fragment>
    )
}

export default OptionProfile
