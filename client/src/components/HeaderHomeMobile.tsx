import React, { useEffect, useState } from 'react'
import images from '~/assets'
import IconApp from '~/assets/icons/IconApp'
import AccountItem from './AccountItem'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import useDebounce from '~/hooks/useDebounce'
import serachUser from '~/apis/serachUser'
import Tippy from '@tippyjs/react/headless'
import { Icon } from '@iconify/react/dist/iconify.js'
import socket from '~/socketIo'

const HeaderHomeMobile = () => {
    const [boxSearch, setBoxSearch] = useState(false)
    const [notifys, setNotifys] = useState(false)
    const [valueSearch, setValueSearch] = useState('')
    const changeBoxSearch = (boxSearch: boolean) => () => setBoxSearch(boxSearch)
    const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => setValueSearch(e.target.value)
    const newValue = useDebounce(valueSearch, 500)
    const { data, isLoading } = useQuery({
        queryKey: ['search', newValue],
        queryFn: () => serachUser(newValue),
        enabled: Boolean(newValue),
    })
    useEffect(() => {
        socket.on(`notification`, () => setNotifys(true))
        return () => {
            socket.off('notification')
        }
    }, [])
    return (
        <div className='md:hidden sticky top-0 bg-white border-b px-4 py-3 z-20'>
            <div className='flex justify-between items-center gap-5'>
                <div>
                    <Link to='/' title='insatgram' className=''>
                        <img src={images.logoText} className='pt-px' />
                    </Link>
                </div>
                <div className='flex items-center gap-5 relative'>
                    <Tippy
                        onClickOutside={changeBoxSearch(false)}
                        interactive
                        placement='bottom-start'
                        visible={boxSearch}
                        render={() => (
                            <div
                                className={classNames(
                                    'w-72 max-h-96 h-64',
                                    'bg-white shadow-lg rounded-lg p-4 border-t z-50',
                                )}
                            >
                                <p className='font-semibold'>Recent</p>
                                <div className='mt-3'>
                                    {!data && <p className='text-center'>not user</p>}
                                    {data &&
                                        data.map((user) => (
                                            <div key={user._id} className='relative'>
                                                <Link to={user.userName} className='absolute inset-0'></Link>
                                                <AccountItem user={user} />
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )}
                    >
                        <div
                            className='bg-gray-100 text-gray-400 px-5 rounded-full max-w-56 py-2'
                            onClick={changeBoxSearch(true)}
                        >
                            {!boxSearch && (
                                <div className='flex items-center gap-3 cursor-text'>
                                    <IconApp type='search-thin' className='w-4 mt-[2px]' />
                                    <p className='-mt-0.5 font-thin'>{valueSearch ? valueSearch : 'search'}</p>
                                </div>
                            )}
                            {boxSearch && (
                                <div className='flex'>
                                    <input
                                        value={valueSearch}
                                        onChange={changeValue}
                                        autoFocus
                                        type='text'
                                        className='bg-transparent outline-none placeholder:font-light'
                                        placeholder='Search'
                                    />
                                    {isLoading && (
                                        <Icon className='w-4 flex-shrink-0 animate-spin' icon='system-uicons:loader' />
                                    )}
                                </div>
                            )}
                        </div>
                    </Tippy>
                    <div>
                        <Link onClick={() => setNotifys(false)} to='notification' className='relative'>
                            <IconApp type='heart-posts' />
                            {notifys && (
                                <div className='w-2 h-2 rounded-[50%] bg-red-600 absolute -top-2 -right-1'></div>
                            )}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderHomeMobile
