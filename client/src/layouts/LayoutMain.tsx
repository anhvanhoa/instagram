import { Outlet } from 'react-router-dom'
import Sidebar from '~/layouts/components/Sidebar'
import NavbarMobile from '~/layouts/components/NavbarMobile'
import { useEffect, useState } from 'react'
import classNames from 'classnames'
const LayoutMain = () => {
    const [nav, setNav] = useState(() => window.innerWidth > 768 || false)
    const resizeCrop = () => (window.innerWidth < 768 ? setNav(false) : setNav(true))
    useEffect(() => {
        window.addEventListener('resize', resizeCrop)
        return () => {
            window.removeEventListener('resize', resizeCrop)
        }
    }, [])
    return (
        <div className='flex group min-h-dvh'>
            {nav && <Sidebar />}
            <div className='scrollbar max-h-screen w-full'>
                <div
                    className={classNames(
                        'flex-1 relative w-full h-full  dark:border-second',
                        'md:rounded-2xl overflow-hidden bg-third',
                    )}
                >
                    <Outlet />
                    {!nav && <NavbarMobile />}
                </div>
            </div>
        </div>
    )
}

export default LayoutMain
