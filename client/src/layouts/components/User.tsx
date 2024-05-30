import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'
import Tippy from '@tippyjs/react'
import 'tippy.js/themes/light.css'
import classNames from 'classnames'
import Img from '~/components/Img'
import useAuth from '~/hooks/useAuth'

interface Props {
    handleId: (id: number) => () => void
}
const User: React.FC<Props> = memo(({ handleId }) => {
    const { user } = useAuth()
    return (
        <Tippy
            content={`Profile`}
            placement='right'
            delay={[1000, 0]}
            theme='light'
            animation='scale'
        >
            <div className='hover:bg-gray-100/80 hover:dark:bg-second rounded-xl'>
                <NavLink
                    to={user ? user.userName : ''}
                    className={({ isActive }) =>
                        classNames(
                            'rounded-md grid items-center grid-cols-[24px,1fr]',
                            'cursor-pointer transition-all group p-3 my-1',
                            { 'active-avatar': isActive },
                        )
                    }
                    onClick={handleId(0)}
                >
                    <div
                        className={classNames(
                            'h-6 w-6 flex-shrink-0 border-2 group-[.active-avatar]:border-black',
                            'group-hover:scale-105 transition-all border-transparent rounded-full',
                        )}
                    >
                        <Img
                            src={user.avatar}
                            alt='Profile'
                            className={classNames('border-solid ', ' object-cover')}
                            isCircle
                        />
                    </div>
                    <span
                        className={classNames(
                            'pl-4 whitespace-nowrap group-[.active-avatar]:font-bold',
                            'group-[.is-cllapse]:hidden hidden lg:block group-[.active-avatar]:text-black',
                        )}
                    >
                        Profile
                    </span>
                </NavLink>
            </div>
        </Tippy>
    )
})

export default User
