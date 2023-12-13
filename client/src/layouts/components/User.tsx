import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'
import Tippy from '@tippyjs/react'
import 'tippy.js/themes/light.css'
import classNames from 'classnames'
import images from '~/assets'
import useContextUser from '~/store/hook'

interface Props {
    handleId: (id: number) => () => void
}
const User: React.FC<Props> = memo(({ handleId }) => {
    const { state } = useContextUser()
    return (
        <Tippy content={`Trang cá nhân`} placement='right' delay={[1000, 0]} theme='light' animation='scale'>
            <NavLink
                to={state ? state.userName : ''}
                className={({ isActive }) =>
                    classNames(
                        'rounded-md grid items-center grid-cols-[24px,1fr] p-3 my-1 cursor-pointer hover:bg-gray-100 transition-all group',
                        {
                            'active-avatar': isActive,
                        },
                    )
                }
                onClick={handleId(0)}
            >
                <div
                    className={classNames(
                        'rounded-circle overflow-hidden h-6 flex-shrink-0 group-hover:scale-105 transition-all',
                    )}
                >
                    <img
                        src={state.avatar || images.noAvatar}
                        alt='Trang cá nhân'
                        className={classNames(
                            'border-[2px] border-solid group-[.active-avatar]:border-black border-transparent rounded-[50%]',
                        )}
                    />
                </div>
                <span
                    className={classNames(
                        'pl-4 whitespace-nowrap group-[.active-avatar]:font-bold',
                        'group-[.is-cllapse]:hidden hidden lg:block',
                    )}
                >
                    Trang cá nhân
                </span>
            </NavLink>
        </Tippy>
    )
})

export default User
