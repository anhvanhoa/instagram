import { Icon } from '@iconify/react/dist/iconify.js'
import { useMutation } from '@tanstack/react-query'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import logout from '~/apis/logout'
import IconApp from '~/assets/icons/IconApp'
import { dataMenu } from '~/mock/menu'
import { initializeUser } from '~/store/constant'
import useContextUser from '~/store/hook'
import manageToken from '~/utils/rfToken'

const BoxMenu = () => {
    const { dispatch } = useContextUser()
    const handleSuccess = () => {
        dispatch({ payload: initializeUser, type: 'LOGOUT' })
        manageToken().crTokenRemove()
        location.href = '/'
        console.log('logout success')
    }
    const { mutate, isPending } = useMutation({
        onSuccess: handleSuccess,
        mutationFn: () => logout(),
    })
    const handleMode = () => {
        const html = window.document.lastElementChild
        const theme = localStorage.getItem('theme')
        if (!theme) {
            html?.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        }
        if (theme === 'dark') {
            html?.classList.remove('dark')
            localStorage.removeItem('theme')
        }
    }
    const handleLogout = () => mutate()
    return (
        <div
            className={classNames(
                'w-52 xs:w-[268px] overflow-hidden rounded-3xl shadow-sidebar shadow-second dark:bg-second bg-gray-100',
            )}
        >
            <ul className={classNames('bg-main list-none p-2 rounded-t-2xl')}>
                {dataMenu.map((element, index) => {
                    if (element.to) {
                        return (
                            <li key={index}>
                                <Link
                                    to={element.to}
                                    className={classNames(
                                        'flex text-sm items-center p-4 hover:bg-gray-100 hover:dark:bg-gray-50/5 rounded-xl transition-all',
                                    )}
                                >
                                    <span>
                                        <IconApp type={element.icon} className='w-[18px] dark:fill-white' />
                                    </span>
                                    <span className={classNames('mb-[3px] pl-3')}>{element.name}</span>
                                </Link>
                            </li>
                        )
                    } else {
                        return (
                            <li key={index}>
                                <div
                                    onClick={handleMode}
                                    className={classNames(
                                        'text-sm flex items-center p-4 hover:bg-gray-100 hover:dark:bg-gray-50/5 rounded-xl transition-all cursor-pointer',
                                    )}
                                >
                                    <span>
                                        <IconApp type={element.icon} className='w-[18px] dark:fill-white' />
                                    </span>
                                    <span className={classNames('mb-[3px] pl-3')}>{element.name}</span>
                                </div>
                            </li>
                        )
                    }
                })}
            </ul>
            <ul className={classNames('bg-main list-none p-2 rounded-b-2xl mt-2')}>
                <li
                    onClick={handleLogout}
                    className={classNames(
                        'p-4 text-sm cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-50/5',
                        'first-letter: rounded-xl flex items-center justify-between',
                    )}
                >
                    <p>Logout</p>
                    {isPending && <Icon icon='ri:loader-line' className='mt-1 animate-spin text-white' />}
                </li>
            </ul>
        </div>
    )
}

export default BoxMenu
