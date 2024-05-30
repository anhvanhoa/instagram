import classNames from 'classnames'
import Logo from './Logo'
import Navbar from './Navbar'
import User from './User'
import Menu from './Menu'
import { useState, useRef, useCallback, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import Search from './Search'
import CreatePosts from '~/components/CreatePosts'
import Notify from './Notify'
import { navbarDesk } from '~/mock/navbar'

const Sidebar = () => {
    const { pathname } = useLocation()
    const handleActive = useCallback(() => {
        const isActive = navbarDesk.find((item) => {
            if (pathname.startsWith('/message')) return item.id === 5
            return item.link === pathname
        })
        return isActive ? isActive.id : 0
    }, [pathname])
    const handleClass = useCallback(
        (id: number) => {
            const active = {
                class: 'lg:w-60',
                id,
            }
            if ([2, 6].includes(id)) {
                if (pathname.startsWith('/message')) active.class = 'is-cllapse is-side'
                else active.class = 'lg:w-60 is-cllapse is-side'
            }
            if (id === 5) active.class = 'is-cllapse'
            return active
        },
        [pathname],
    )
    const [active, setActive] = useState<{
        class: string
        id: number
    }>(() => {
        const id = handleActive()
        return handleClass(id)
    })
    //handle active by id
    const handleId = useCallback(
        (id: number) => () =>
            setActive((prev) => {
                const idActive = prev.id === id ? handleActive() : id
                const active = handleClass(idActive)
                if (id === 7) {
                    if (prev.class.includes('is-side')) {
                        return {
                            ...active,
                            class: prev.class.replace('is-side', ''),
                        }
                    }
                    return {
                        ...active,
                        class: prev.class,
                    }
                }
                return active
            }),
        [handleActive, handleClass],
    )
    const activeH = useMemo(() => ({ id: active.id, handleId }), [handleId, active.id])
    // handle click outside
    const refSide = useRef<HTMLDivElement>(null)
    const handleClickOutside = (event: MouseEvent) => {
        if (refSide.current && !refSide.current.contains(event.target as Node))
            handleId(active.id)()
    }
    return (
        <>
            <section
                ref={refSide}
                className={classNames(
                    'max-h-screen min-h-screen sticky top-0 hidden md:block z-20 group',
                    active.class,
                )}
            >
                <div
                    className={classNames(
                        'transition-all duration-100 ease-linear px-3 pt-2 pb-5',
                        'flex flex-col justify-between w-[76px] lg:w-60 bg-main ',
                        'group-[.is-cllapse]:w-[76px] scrollbar h-full border-r',
                        'border-second relative z-10',
                    )}
                >
                    <div>
                        <Logo handleId={handleId} />
                        <Navbar active={activeH} />
                        <User handleId={handleId} />
                    </div>
                    <div>
                        <Menu />
                    </div>
                </div>
                <div
                    className={classNames(
                        'h-screen w-96 bg-main top-0 -translate-x-full rounded-e-3xl fixed',
                        'shadow-sidebar dark:shadow-gray-50/5 group-[.is-side]:translate-x-0',
                        'transition-all absolute -ml-px duration-300 group-[.is-side]:left-[76px]',
                    )}
                >
                    {active.id === 2 && (
                        <Search
                            handleClose={handleId(2)}
                            handleClickOutside={handleClickOutside}
                        />
                    )}
                    {active.id === 6 && (
                        <Notify
                            handleClose={handleId(6)}
                            handleClickOutside={handleClickOutside}
                        />
                    )}
                </div>
            </section>
            {active.id === 7 && <CreatePosts handleClose={handleId(7)} />}
        </>
    )
}

export default Sidebar
