import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'
import Tippy from '@tippyjs/react'
import 'tippy.js/themes/light.css'
import classNames from 'classnames'
import useContextUser from '~/store/hook'
import Img from '~/components/Img'

interface Props {
    handleId: (id: number) => () => void
}
const User: React.FC<Props> = memo(({ handleId }) => {
    const { state } = useContextUser()
    return (
        <Tippy content={`Profile`} placement='right' delay={[1000, 0]} theme='light' animation='scale'>
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
                        'rounded-circle overflow-hidden h-6 w-6 flex-shrink-0 group-hover:scale-105 transition-all',
                    )}
                >
                    <Img
                        src={state.avatar}
                        alt='Profile'
                        className={classNames(
                            'border-[2px] border-solid group-[.active-avatar]:border-black',
                            ' border-transparent rounded-[50%] object-cover h-full w-full',
                        )}
                    />
                </div>
                <span
                    className={classNames(
                        'pl-4 whitespace-nowrap group-[.active-avatar]:font-bold',
                        'group-[.is-cllapse]:hidden hidden lg:block',
                    )}
                >
                    Profile
                </span>
            </NavLink>
        </Tippy>
    )
})

export default User
