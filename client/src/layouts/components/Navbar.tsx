import { memo } from 'react'
import { NavLink } from 'react-router-dom'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'
import 'tippy.js/animations/scale.css'
import IconApp from '~/assets/icons/IconApp'
import classNames from 'classnames'
import React from 'react'
import { NavbarItem } from '~/types/navbar'

interface Props {
    data: NavbarItem[]
    active: { id: number; handleId: (id: number) => () => void }
}
const Navbar: React.FC<Props> = memo(({ data, active }) => {
    const { id, handleId } = active
    return (
        <div>
            {data.map((element) => (
                <Tippy
                    key={element.id}
                    content={element.name}
                    placement='right'
                    delay={[1000, 0]}
                    theme='light'
                    animation='scale'
                >
                    <li className='list-none my-1.5 rounded-md transition-all hover:bg-gray-100'>
                        <NavLink
                            to={element.link}
                            onMouseDown={handleId(element.id)}
                            onClick={(e) => element.link == '/#' && e.preventDefault()}
                            className={({ isActive }) =>
                                classNames('group/item', {
                                    'font-bold': isActive && element.id === id,
                                })
                            }
                        >
                            <div className={classNames('rounded-md', 'flex items-center p-3 overflow-hidden')}>
                                <span className='group-hover/item:scale-105 transition-all flex-shrink-0'>
                                    <IconApp type={element.id === id ? element.iconActive : element.icon} />
                                </span>
                                <span
                                    className={classNames(
                                        'pl-4 whitespace-nowrap',
                                        'group-[.is-cllapse]:hidden hidden lg:block',
                                    )}
                                >
                                    {element.name}
                                </span>
                            </div>
                        </NavLink>
                    </li>
                </Tippy>
            ))}
        </div>
    )
})

export default Navbar
