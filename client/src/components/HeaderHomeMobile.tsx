import { useEffect, useState } from 'react'
import IconApp from '~/assets/icons/IconApp'
import { Link } from 'react-router-dom'
import socket from '~/socketIo'
import SearchMobile from './SearchMobile'
import classnames from 'classnames'

const HeaderHomeMobile = () => {
    const [notify, setNotify] = useState(false)
    useEffect(() => {
        socket.on(`notification`, () => setNotify(true))
        return () => {
            socket.off('notification')
        }
    }, [])
    return (
        <section className='md:hidden sticky top-0 z-[100]'>
            <div className='border-second bg-[rgba(var(--background-third-rgb))] border-b px-4 py-2'>
                <div className='flex justify-between items-center gap-5'>
                    <div>
                        <Link to='/' title='insatgram'>
                            <IconApp type='logo-icon' className='w-6 dark:fill-white' />
                        </Link>
                    </div>
                    <div className='flex items-center gap-x-6'>
                        {/* Search */}
                        <SearchMobile />
                        {/* Thông báo */}
                        <Link to='notification' className='relative'>
                            <IconApp type='heart-posts' />
                            {notify && (
                                <div
                                    className={classnames(
                                        'w-2 h-2 rounded-full bg-red-600',
                                        'absolute -top-0.5 -right-1.5',
                                    )}
                                ></div>
                            )}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeaderHomeMobile
