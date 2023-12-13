// import dataMenu from '~/dataDefault/dataMenu'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import logout from '~/apis/logout'
import IconApp from '~/assets/icons/IconApp'
import { initializeUser } from '~/store/constant'
import useContextUser from '~/store/hook'
interface Menu {
    name: string
    icon: React.ReactNode
    to?: string
}
const dataMenu: Menu[] = [
    {
        name: 'Cài đặt',
        icon: <IconApp className='w-[18px]' type='setting' />,
        to: '/account/edit',
    },
    {
        name: 'Hoạt động của bạn',
        icon: <IconApp className='w-[18px]' type='activity' />,
        to: '/your_activity',
    },
    {
        name: 'Đã lưu',
        icon: <IconApp className='w-[18px]' type='saved' />,
        to: 'anhvanhoa.it/saved',
    },
    {
        name: 'Chuyển chế độ',
        icon: <IconApp className='w-[18px]' type='mode' />,
    },
    {
        name: 'Báo cáo sự cố',
        icon: <IconApp className='w-[18px]' type='problem' />,
    },
]
const BoxMenu = () => {
    const { state, dispatch } = useContextUser()
    const handleLogout = () => {
        logout(state.accessToken).then(() => dispatch({ payload: initializeUser, type: 'LOGOUT' }))
    }
    return (
        <div className={classNames('w-[268px] overflow-hidden rounded-2xl bg-[#F4F4F4]')}>
            <ul className={classNames('bg-white list-none p-2 rounded-t-2xl')}>
                {dataMenu.map((element, index) => {
                    if (element.to) {
                        return (
                            <li key={index}>
                                <Link
                                    to={element.to}
                                    className={classNames(
                                        'flex text-sm items-center p-4 hover:bg-gray-100 rounded-xl transition-all',
                                    )}
                                >
                                    <span>{element.icon}</span>
                                    <span className={classNames('mb-[3px] pl-3')}>{element.name}</span>
                                </Link>
                            </li>
                        )
                    } else {
                        return (
                            <li key={index}>
                                <div
                                    className={classNames(
                                        'flex items-center p-4 hover:bg-gray-100 rounded-xl transition-all',
                                    )}
                                >
                                    <span>{element.icon}</span>
                                    <span className={classNames('mb-[3px] pl-3')}>{element.name}</span>
                                </div>
                            </li>
                        )
                    }
                })}
            </ul>
            <ul className={classNames('bg-white list-none p-2 rounded-b-2xl mt-2')}>
                <li onClick={handleLogout} className={classNames('p-4 cursor-pointer hover:bg-gray-100 rounded-xl')}>
                    <p>Đăng xuất</p>
                </li>
            </ul>
        </div>
    )
}

export default BoxMenu
