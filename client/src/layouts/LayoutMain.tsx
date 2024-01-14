import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar'
const LayoutMain = () => {
    return (
        <div className='flex group'>
            <Sidebar />
            <div className='flex-1'>
                <Outlet />
            </div>
        </div>
    )
}

export default LayoutMain
