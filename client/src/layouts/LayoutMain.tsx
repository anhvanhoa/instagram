import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import NavbarMobile from './components/NavbarMobile'
import { useEffect, useState } from 'react'
const LayoutMain = () => {
    const [nav, setNav] = useState(() => window.innerWidth > 768 || false)
    const resizeCrop = () => {
        if (window.innerWidth < 768) setNav(false)
        else setNav(true)
    }
    useEffect(() => {
        window.addEventListener('resize', resizeCrop)
        return () => {
            window.removeEventListener('resize', resizeCrop)
        }
    }, [])
    return (
        <div className='flex group'>
            {nav && <Sidebar />}
            <div className='flex-1 relative'>
                {!nav && <NavbarMobile />}
                <Outlet />
                <div className='md:mb-0 mb-10'></div>
            </div>
        </div>
    )
}

export default LayoutMain
