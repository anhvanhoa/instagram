import { memo, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'
import 'tippy.js/animations/scale.css'
import IconApp from '~/assets/icons/IconApp'
import classNames from 'classnames'
import React from 'react'
import socket from '~/socketIo'
import { navbarDesk } from '~/mock/navbar'

interface Props {
    active: { id: number; handleId: (id: number) => () => void }
}
const Navbar: React.FC<Props> = memo(({ active }) => {
    const [notifys, setNotifys] = useState({
        message: false,
        notification: false,
    })
    const navigate = useNavigate()
    const { id, handleId } = active
    useEffect(() => {
        if (id === 5) {
            setNotifys((prev) => ({
                ...prev,
                message: false,
            }))
            socket.off('notifyMessage')
        } else
            socket.on(`notifyMessage`, () =>
                setNotifys((prev) => ({
                    ...prev,
                    message: true,
                })),
            )
        if (id === 6) {
            setNotifys((prev) => ({
                ...prev,
                notification: false,
            }))
            socket.off('notification')
        } else {
            socket.on(`notification`, () =>
                setNotifys((prev) => ({
                    ...prev,
                    notification: true,
                })),
            )
        }
        return () => {
            socket.off('notifyMessage')
        }
    }, [id])
    const handleActive = (link: string, id: number) => () => {
        handleId(id)()
        if (link !== '/#') navigate(link)
    }
    return (
        <div>
            {navbarDesk.map((element) => (
                <Tippy
                    key={element.id}
                    content={element.name}
                    placement='right'
                    delay={[1000, 0]}
                    theme='light'
                    animation='scale'
                >
                    <li
                        onClick={handleActive(element.link, element.id)}
                        className={classNames('list-none my-1.5 rounded-md transition-all hover:bg-gray-100')}
                    >
                        <NavLink to={element.link} onClick={(e) => e.preventDefault()} className='group/item'>
                            <div
                                className={classNames('rounded-md flex items-center p-3 overflow-hidden', {
                                    'font-bold': element.id === id,
                                })}
                            >
                                <span className='group-hover/item:scale-105 transition-all flex-shrink-0 relative'>
                                    <IconApp type={element.id === id ? element.iconActive : element.icon} />
                                    {notifys.message && element.id === 5 && (
                                        <div className='w-2 h-2 rounded-[50%] bg-red-600 absolute -top-1 -right-1'></div>
                                    )}
                                    {notifys.notification && element.id === 6 && (
                                        <div className='w-2 h-2 rounded-[50%] bg-red-600 absolute -top-1 -right-1'></div>
                                    )}
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
