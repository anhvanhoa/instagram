import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
const LayoutAuth = () => {
    return (
        <div className='bg-white min-h-screen'>
            <Outlet />
            <div className='hidden md:block'>
                <Footer />
            </div>
        </div>
    )
}
export default LayoutAuth
