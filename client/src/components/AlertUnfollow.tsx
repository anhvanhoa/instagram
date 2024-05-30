import { UserBase } from '~/types/auth'
import React from 'react'
import Overlay from './Overlaying'
import Unfollow from './Unfollow'
import Wrapper from './Wrapper'
interface Props {
    user: UserBase
    children: React.ReactNode
    onSuccess?: () => void
}
const AlertUnfollow: React.FC<Props> = ({ user, children, onSuccess }) => {
    return (
        <Overlay
            zIndex={1000}
            Component={
                <Wrapper classname='max-w-sm'>
                    <Unfollow onSuccess={onSuccess} user={user} />
                </Wrapper>
            }
        >
            {children}
        </Overlay>
    )
}

export default AlertUnfollow
