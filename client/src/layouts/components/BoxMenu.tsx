import { Icon } from '@iconify/react/dist/iconify.js'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import IconApp from '~/assets/icons/IconApp'
import { useLogout } from '~/hooks/auth.hook'
import { dataMenu } from '~/mock/menu'
import { darkMode } from '~/utils/helper'

const BoxMenu = () => {
    const logout = useLogout()
    const handleLogout = () => {
        const time = new Date().toISOString()
        logout.mutate(time)
    }
    return (
        <div
            className={classNames(
                'w-52 xs:w-[268px] overflow-hidden rounded-3xl shadow-3xl shadow-gray-300 dark:bg-second bg-gray-100',
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
                                        'flex text-sm items-center p-4 hover:bg-gray-100',
                                        'hover:dark:bg-gray-50/5 rounded-xl transition-all',
                                    )}
                                >
                                    <span>
                                        <IconApp
                                            type={element.icon}
                                            className='w-[18px] dark:fill-white'
                                        />
                                    </span>
                                    <span className={classNames('mb-1 pl-3')}>
                                        {element.name}
                                    </span>
                                </Link>
                            </li>
                        )
                    } else {
                        return (
                            <li key={index}>
                                <div
                                    onClick={darkMode}
                                    className={classNames(
                                        'text-sm flex items-center p-4 hover:bg-gray-100 hover:dark:bg-gray-50/5 rounded-xl transition-all cursor-pointer',
                                    )}
                                >
                                    <span>
                                        <IconApp
                                            type={element.icon}
                                            className='w-[18px] dark:fill-white'
                                        />
                                    </span>
                                    <span className={classNames('mb-[3px] pl-3')}>
                                        {element.name}
                                    </span>
                                </div>
                            </li>
                        )
                    }
                })}
            </ul>
            <ul className={classNames('bg-main list-none p-2 rounded-b-2xl mt-1')}>
                <li
                    onClick={handleLogout}
                    className={classNames(
                        'p-4 text-sm cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-50/5',
                        'first-letter: rounded-xl flex items-center justify-between',
                    )}
                >
                    <p>Logout</p>
                    {logout.isPending && (
                        <Icon
                            icon='ri:loader-line'
                            className='mt-1 animate-spin text-white'
                        />
                    )}
                </li>
            </ul>
        </div>
    )
}

export default BoxMenu
