// import dataMenu from '~/dataDefault/dataMenu'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useMutation } from '@tanstack/react-query'
import classNames from 'classnames'
import { Link, useNavigate } from 'react-router-dom'
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
        name: 'Setting',
        icon: <IconApp className='w-[18px]' type='setting' />,
        to: '/accounts/edit',
    },
    {
        name: 'Your activity',
        icon: <IconApp className='w-[18px]' type='activity' />,
        to: '/your_activity',
    },
    {
        name: 'Saved',
        icon: <IconApp className='w-[18px]' type='saved' />,
        to: 'anhvanhoa.it/saved',
    },
    {
        name: 'Switch apperance',
        icon: <IconApp className='w-[18px]' type='mode' />,
    },
    {
        name: 'Report a problem',
        icon: <IconApp className='w-[18px]' type='problem' />,
    },
]
const BoxMenu = () => {
    const { dispatch } = useContextUser()
    const navigate = useNavigate()
    const handleSuccess = () => {
        dispatch({ payload: initializeUser, type: 'LOGOUT' })
        localStorage.removeItem('rf_token')
        setTimeout(() => navigate('/'), 400)
    }
    const { mutate, isPending } = useMutation({
        onSuccess: handleSuccess,
        mutationFn: () => logout(),
    })
    const handleLogout = () => mutate()
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
                                        'text-sm flex items-center p-4 hover:bg-gray-100 rounded-xl transition-all',
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
                <li
                    onClick={handleLogout}
                    className={classNames(
                        'p-4 text-sm cursor-pointer hover:bg-gray-100',
                        'first-letter: rounded-xl flex items-center justify-between',
                    )}
                >
                    <p>Logout</p>
                    {isPending && <Icon icon='ri:loader-line' className='mt-1 animate-spin' />}
                </li>
            </ul>
        </div>
    )
}

export default BoxMenu
