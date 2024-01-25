import { Outlet } from 'react-router-dom'
import Sidebar from '~/layouts/components/Sidebar'
import NavbarMobile from '~/layouts/components/NavbarMobile'
import { useEffect, useState } from 'react'
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
            <div className='flex-1 relative'>
                <Outlet />
                {!nav && <NavbarMobile />}
            </div>
        </div>
    )
}

export default LayoutMain
