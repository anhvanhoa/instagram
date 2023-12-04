import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
const LayoutAuth = () => {
    return (
        <div>
            <Outlet />
            <Footer />
        </div>
    )
}
export default LayoutAuth
