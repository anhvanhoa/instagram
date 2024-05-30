import Tippy from '@tippyjs/react/headless'
import Wrapper from './Wrapper'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'
import { settings } from '~/mock/setting'
import { Icon } from '@iconify/react'

const HeaderSetting = () => {
    return (
        <div>
            <Tippy
                trigger='click'
                interactive
                render={() => (
                    <Wrapper>
                        <div className='bg-white p-2 rounded-xl'>
                            {settings.map((item) => (
                                <div className='mt-2' key={item.id}>
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
                                                            'flex items-center gap-2 hover:bg-gray-100/80 rounded-xl px-3 py-2 mt-1',
                                                            {
                                                                'bg-gray-100/80':
                                                                    isActive,
                                                            },
                                                        )}
                                                    >
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
                    </Wrapper>
                )}
            >
                <div className='bg-white rounded-xl cursor-pointer flex items-center'>
                    <Icon icon='ph:list-bold' width='24' height='24' />
                </div>
            </Tippy>
        </div>
    )
}

export default HeaderSetting
