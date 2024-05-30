import { Outlet } from 'react-router-dom'
import Sidebar from '~/layouts/components/Sidebar'
import NavbarMobile from '~/layouts/components/NavbarMobile'
import classNames from 'classnames'
import useResize from '~/hooks/useResize.hook'
interface Props {
    children?: React.ReactNode
}

const LayoutMain = ({ children }: Props) => {
    const navbar = useResize()
    return (
        <div>
            <div className='flex group'>
                {navbar && <Sidebar />}
                <div className={classNames('flex-1 dark:border-second bg-third')}>
                    <Outlet />
                    {/* Handle error */}
                    {children}
                    {/* End error */}
                </div>
                <div className='fixed w-full bottom-0 z-50'>
                    {!navbar && <NavbarMobile />}
                </div>
            </div>
        </div>
    )
}

export default LayoutMain
