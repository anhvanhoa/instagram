import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import IconApp from '~/assets/icons/IconApp'
import Img from '~/components/Img'
import socket from '~/socketIo'
import useContextUser from '~/store/hook'
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
    const { state: user } = useContextUser()
    const [notifys, setNotifys] = useState(false)
    useEffect(() => {
        socket.on(`notifyMessage`, () => setNotifys(true))
        return () => {
            socket.off('notifyMessage')
        }
    }, [])
    return (
        <div className='md:hidden'>
            <div className='fixed w-full bottom-0 bg-white border-t z-50'>
                <div className='grid grid-cols-6 px-1 xs:px-2 md:px-4 py-4'>
                    {dataNavbar.map((navbar) => (
                        <NavLink onClick={() => navbar.id === 5 && setNotifys(false)} to={navbar.link} key={navbar.id}>
                            {({ isActive }) => (
                                <div title={navbar.name} className={classNames('flex justify-center')}>
                                    <div className='relative'>
                                        {notifys && navbar.id === 5 && (
                                            <div className='w-2 h-2 rounded-[50%] bg-red-600 absolute -top-1 -right-1'></div>
                                        )}
                                        <IconApp
                                            type={isActive ? navbar.iconActive : navbar.icon}
                                            className='cursor-pointer w-6 hover:scale-110 transition-all'
                                        />
                                    </div>
                                </div>
                            )}
                        </NavLink>
                    ))}
                    <NavLink title={user.fullName} to={`/${user.userName}`} className='flex justify-center'>
                        {({ isActive }) => (
                            <Img
                                src={user.avatar}
                                className={classNames('w-6 h-6 rounded-[50%]', {
                                    'border border-sky-600': isActive,
                                })}
                            />
                        )}
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default NavbarMobile