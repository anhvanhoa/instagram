import classNames from 'classnames'
import Logo from './Logo'
import Navbar from './Navbar'
import { NavbarItem } from '~/types/navbar'
import User from './User'
import Menu from './Menu'
import { useState, useRef, useCallback, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import Search from './Search'
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
        icon: 'search-thin',
        iconActive: 'search-solid',
        link: '/#',
        name: 'Search',
    },
    {
        id: 3,
        icon: 'explore-thin',
        iconActive: 'explore-solid',
        link: '/explore',
        name: 'Explore',
    },
    {
        id: 4,
        icon: 'reels-thin',
        iconActive: 'reels-solid',
        link: '/reels',
        name: 'Reels',
    },
    {
        id: 5,
        icon: 'meaagae-thin',
        iconActive: 'message-solid',
        link: '/inbox',
        name: 'Message',
    },
    {
        id: 6,
        icon: 'heart-thin',
        iconActive: 'heart-solid',
        link: '/#',
        name: 'Notification',
    },
    {
        id: 7,
        icon: 'create-post-thin',
        iconActive: 'create-post-solid',
        link: '/#',
        name: 'Create Post',
    },
]
const Sidebar = () => {
    const location = useLocation()
    const [id, setId] = useState<number>(() => {
        const isActive = dataNavbar.find((item) => item.link === location.pathname)
        return isActive ? isActive.id : 0
    })
    //handle active by id
    const handleId = useCallback(
        (id: number) => () => {
            setId((prev) => {
                if (prev === id) {
                    const isActive = dataNavbar.find((item) => item.link === location.pathname)
                    return isActive ? isActive.id : 0
                }
                return id
            })
        },
        [location.pathname],
    )
    const active = useMemo(() => ({ id, handleId }), [handleId, id])
    // handle click outside
    const refSide = useRef<HTMLDivElement>(null)
    const handleClickOutside = (event: MouseEvent) => {
        if (refSide.current && !refSide.current.contains(event.target as Node)) {
            console.log('Clicked outside the div!')
            handleId(id)()
        }
    }
    return (
        <section
            ref={refSide}
            className={classNames('relative', {
                'is-cllapse group': [2, 5, 6].includes(id),
                'is-side group': [2, 6].includes(id),
            })}
        >
            <div
                className={classNames(
                    'transition-all duration-100 ease-linear px-3 pt-2 pb-5 sticky top-0 h-screen w-[76px] lg:w-60 group-[.is-cllapse]:w-[76px]',
                    'flex flex-col justify-between border-r border-solid border-[#ccc]/40 z-[99] bg-white',
                )}
            >
                <div>
                    <Logo handleId={handleId} />
                    <Navbar active={active} data={dataNavbar} />
                    <User handleId={handleId} />
                </div>
                <div>
                    <Menu />
                </div>
            </div>
            <div
                className={classNames(
                    'absolute h-screen w-96 bg-white top-0 right-[120%] ml-px rounded-e-3xl',
                    'shadow-sidebar group-[.is-side]:translate-x-[124%] duration-200 transition-transform z-50',
                )}
            >
                {id === 2 && <Search handleClickOutside={handleClickOutside} />}
            </div>
        </section>
    )
}

export default Sidebar