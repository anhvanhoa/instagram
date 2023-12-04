import { Outlet } from 'react-router-dom'
const LayoutMain = () => {
    return (
        <div>
            <h1>Heder</h1>
            <Outlet />
        </div>
    )
}

export default LayoutMain
