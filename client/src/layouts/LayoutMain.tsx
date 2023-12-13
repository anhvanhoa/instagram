import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar'
const LayoutMain = () => {
    return (
        <div className='flex'>
            <Sidebar />
            <Outlet />
        </div>
    )
}

export default LayoutMain
