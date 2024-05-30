import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import IconApp from '~/assets/icons/IconApp'
import Img from '~/components/Img'
import useAuth from '~/hooks/useAuth'
import socket from '~/socketIo'
import { NavbarItem } from '~/types/navbar'

const dataNavbar: NavbarItem[] = [
    {
        id: 1,
        icon: 'home-thin',
        iconActive: 'home-solid',
        link: '/',
        name: 'Home',
    },
    {
        id: 2,
        icon: 'explore-thin',
        iconActive: 'explore-solid',
        link: '/explore',
        name: 'Explore',
    },
    {
        id: 3,
        icon: 'reels-thin',
        iconActive: 'reels-solid',
        link: '/reels',
        name: 'Reels',
    },
    {
        id: 4,
        icon: 'create-post-thin',
        iconActive: 'create-post-solid',
        link: '/create-posts',
        name: 'Create',
    },
    {
        id: 5,
        icon: 'meaagae-thin',
        iconActive: 'message-solid',
        link: '/message',
        name: 'Message',
    },
]
const NavbarMobile = () => {
    const { user } = useAuth()
    const [notifys, setNotifys] = useState(false)
    const location = useLocation()
    useEffect(() => {
        if (!location.pathname.startsWith('/message'))
            socket.on(`notifyMessage`, () => setNotifys(true))
        return () => {
            if (!location.pathname.startsWith('/message')) socket.off('notifyMessage')
        }
    }, [location.pathname])
    return (
        <div className='w-full bg-main border-second border-t'>
            <div className='grid grid-cols-6 px-1 xs:px-2 md:px-4 py-4'>
                {dataNavbar.map((navbar) => (
                    <NavLink
                        onClick={() => navbar.id === 5 && setNotifys(false)}
                        to={navbar.link}
                        key={navbar.id}
                    >
                        {({ isActive }) => (
                            <div
                                title={navbar.name}
                                className={classNames('flex justify-center')}
                            >
                                <div className='relative'>
                                    {notifys && navbar.id === 5 && (
                                        <div className='w-2 h-2 rounded-[50%] bg-red-600 absolute -top-1 -right-1'></div>
                                    )}
                                    <IconApp
                                        type={navbar.icon}
                                        className={classNames(
                                            'cursor-pointer w-6 hover:scale-110 transition-all',
                                            {
                                                'fill-pink-600 text-pink-600': isActive,
                                                'fill-white': !isActive,
                                            },
                                        )}
                                    />
                                </div>
                            </div>
                        )}
                    </NavLink>
                ))}
                <NavLink
                    title={user.fullName}
                    to={`/${user.userName}`}
                    className='flex justify-center'
                >
                    {({ isActive }) => (
                        <div className='w-6 h-6 '>
                            <Img
                                src={user.avatar}
                                className={classNames({
                                    'border border-sky-600': isActive,
                                })}
                                isCircle
                            />
                        </div>
                    )}
                </NavLink>
            </div>
        </div>
    )
}

export default NavbarMobile
