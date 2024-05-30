import { Icon } from '@iconify/react'
import classNames from 'classnames'
import { NavLink, Outlet } from 'react-router-dom'
import HeaderMobile from '~/components/HeaderMobile'
import HeaderSetting from '~/components/SettingMobile'
import { settings } from '~/mock/setting'

const Settings = () => {
    return (
        <div className='relative'>
            <div className='block md:hidden'>
                <HeaderMobile title='Settings' contextNext={<HeaderSetting />} />
            </div>
            <div className='flex'>
                <div className='hidden md:block sticky top-0 min-w-72 max-h-screen min-h-screen border-r border-second overflow-auto scrollbar'>
                    <div className='p-8'>
                        <h3 className='px-3 mt-2 text-xl font-bold'>Settings</h3>
                        {settings.map((item) => (
                            <div className='mt-10' key={item.id}>
                                <p className='text-xs font-medium text-gray-500 px-3'>
                                    {item.title}
                                </p>
                                <ul className='mt-3'>
                                    {item.childrens.map((child) => (
                                        <NavLink to={child.link} key={child.id}>
                                            {({ isActive }) => (
                                                <li
                                                    key={child.id}
                                                    className={classNames(
                                                        'flex items-center gap-2 hover:bg-gray-100/80 rounded-lg px-3 py-3 mt-1',
                                                        {
                                                            'bg-gray-100/80': isActive,
                                                        },
                                                    )}
                                                >
                                                    <Icon
                                                        icon={child.icon}
                                                        className='size-6'
                                                    />
                                                    <p className='text-sm'>
                                                        {child.title}
                                                    </p>
                                                </li>
                                            )}
                                        </NavLink>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='w-full'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Settings
