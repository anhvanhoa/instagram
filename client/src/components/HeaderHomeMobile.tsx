import { useEffect, useState } from 'react'
import IconApp from '~/assets/icons/IconApp'
import { Link } from 'react-router-dom'
import socket from '~/socketIo'
import SearchMobile from './SearchMobile'

const HeaderHomeMobile = () => {
    const [notifys, setNotifys] = useState(false)
    const [search, setSearch] = useState(false)
    const handleOnOffSearch = () => setSearch((pre) => !pre)
    useEffect(() => {
        socket.on(`notification`, () => setNotifys(true))
        return () => {
            socket.off('notification')
        }
    }, [])
    return (
        <div>
            {search && <SearchMobile handleOnOffSearch={handleOnOffSearch} />}
            <div className='md:hidden sticky top-0 border-second bg-[rgba(var(--background-third-rgb),0.5)] border-b px-4 py-3 z-[100] backdrop-blur-xl'>
                <div className='flex justify-between items-center gap-5'>
                    <div>
                        <Link to='/' title='insatgram'>
                            <IconApp type='logo-icon' className='w-6 dark:fill-white' />
                        </Link>
                    </div>
                    <div className='flex items-center gap-x-6 relative'>
                        <div
                            onClick={() => setSearch(true)}
                            className='cursor-pointer p-1.5 rounded-[50%] flex items-center'
                        >
                            <IconApp type='search-thin' className='w-6' />
                        </div>
                        <Link onClick={handleOnOffSearch} to='notification' className='relative'>
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
