import classNames from 'classnames'
import Logo from './Logo'
import Navbar from './Navbar'
import User from './User'
import Menu from './Menu'
import { useState, useRef, useCallback, useMemo, useEffect } from 'react'
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
    const [id, setId] = useState<number>(handleActive())
    //handle active by id
    const handleId = useCallback(
        (id: number) => () => setId((prev) => (prev === id ? handleActive() : id)),
        [handleActive],
    )
    useEffect(() => {
        setId(handleActive())
    }, [handleActive])
    const active = useMemo(() => ({ id, handleId }), [handleId, id])
    // handle click outside
    const refSide = useRef<HTMLDivElement>(null)
    const handleClickOutside = (event: MouseEvent) => {
        if (refSide.current && !refSide.current.contains(event.target as Node)) handleId(id)()
    }
    return (
        <section
            ref={refSide}
            className={classNames('hidden md:block relative', {
                'is-cllapse group': [2, 5, 6].includes(id),
                'is-side group': [2, 6].includes(id),
                'lg:w-60': id !== 5 && !location.pathname.startsWith('/message'),
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
                    <Navbar active={active} />
                    <User handleId={handleId} />
                </div>
                <div>
                    <Menu />
                </div>
            </div>
            <div
                className={classNames(
                    'h-screen w-96 bg-white top-0 -left-full ml-px rounded-e-3xl fixed',
                    'shadow-sidebar group-[.is-side]:left-[76px] duration-200 transition-all z-50',
                )}
            >
                {id === 2 && <Search handleClickOutside={handleClickOutside} />}
                {id === 6 && <Notify handleClickOutside={handleClickOutside} />}
            </div>
            {id === 7 && <CreatePosts handleClose={handleId(7)} />}
        </section>
    )
}

export default Sidebar
