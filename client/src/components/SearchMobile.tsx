import React, { memo, useState } from 'react'
import useDebounce from '~/hooks/useDebounce'
import { Icon } from '@iconify/react/dist/iconify.js'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import AccountItem from './AccountItem'
import { useSearchUser } from '~/hooks/user.hook'
import Overlay from './Overlaying'
import IconApp from '~/assets/icons/IconApp'
import Wrapper from './Wrapper'

interface Props {}
const SearchMobile: React.FC<Props> = memo(() => {
    const [valueSearch, setValueSearch] = useState('')
    const value = useDebounce(valueSearch, 700)
    const { data, isLoading } = useSearchUser({ value })
    const changeValue = (e: React.ChangeEvent<HTMLInputElement>) =>
        setValueSearch(e.target.value)
    return (
        <div className='md:hidden'>
            <Overlay
                render={() => (
                    <Wrapper classname='max-w-md'>
                        <div className=' text-gray-800 px-6 py-3.5'>
                            <div className='flex'>
                                <input
                                    value={valueSearch}
                                    onChange={changeValue}
                                    autoFocus
                                    type='text'
                                    className='bg-transparent outline-none flex-1 py-0.5 placeholder:text-gray-800'
                                    placeholder='Search'
                                />
                                {isLoading && (
                                    <Icon
                                        className='w-4 flex-shrink-0 animate-spin'
                                        icon='system-uicons:loader'
                                    />
                                )}
                            </div>
                        </div>
                        <div
                            className={classNames(
                                'max-h-96 h-64 p-2 z-50',
                                'overflow-y-auto  border-gray-300 border-t',
                            )}
                        >
                            {data && !data?.count_users && (
                                <p className='text-center mt-2 select-none text-gray-400'>
                                    No matching results
                                </p>
                            )}
                            <div className='hover:*:bg-gray-50'>
                                {data?.users &&
                                    data.users.map((user) => (
                                        <div
                                            key={user._id}
                                            className='relative mt-0.5 px-3 py-2 rounded-xl'
                                        >
                                            <Link
                                                to={user.userName}
                                                className='absolute inset-0'
                                            ></Link>
                                            <AccountItem user={user} />
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </Wrapper>
                )}
            >
                <div className='cursor-pointer p-1.5 rounded-[50%] flex items-center'>
                    <IconApp type='search-thin' className='w-6' />
                </div>
            </Overlay>
        </div>
    )
})

export default SearchMobile
