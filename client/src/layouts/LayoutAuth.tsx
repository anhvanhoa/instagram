import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
const LayoutAuth = () => {
    return (
        <div>
            <Outlet />
            <div className='hidden md:block'>
                <Footer />
            </div>
        </div>
    )
}
export default LayoutAuth
