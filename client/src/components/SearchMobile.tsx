import React, { useState } from 'react'
import OverLay from './OverLay'
import useDebounce from '~/hooks/useDebounce'
import { useQuery } from '@tanstack/react-query'
import serachUser from '~/apis/serachUser'
import { Icon } from '@iconify/react/dist/iconify.js'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import AccountItem from './AccountItem'
interface Props {
    handleOnOffSearch(): void
}
const SearchMobile: React.FC<Props> = ({ handleOnOffSearch }) => {
    const [boxSearch, setBoxSearch] = useState(false)
    const [valueSearch, setValueSearch] = useState('')
    const changeBoxSearch = (boxSearch: boolean) => () => setBoxSearch(boxSearch)
    const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => setValueSearch(e.target.value)
    const newValue = useDebounce(valueSearch, 500)
    const { data, isLoading } = useQuery({
        queryKey: ['search', newValue],
        queryFn: () => serachUser(newValue),
        enabled: Boolean(newValue),
    })
    return (
        <div>
            <OverLay onClose={handleOnOffSearch}>
                <div className='bg-white rounded-lg'>
                    <div className=' text-gray-400 px-5 max-w-72 py-2.5 border-b' onClick={changeBoxSearch(true)}>
                        {!boxSearch && <p className='-mt-0.5 font-thin'>{valueSearch ? valueSearch : 'search'}</p>}
                        {boxSearch && (
                            <div className='flex'>
                                <input
                                    value={valueSearch}
                                    onChange={changeValue}
                                    autoFocus
                                    type='text'
                                    className='bg-transparent outline-none placeholder:font-light font-light flex-1'
                                    placeholder='Search'
                                />
                                {isLoading && (
                                    <Icon className='w-4 flex-shrink-0 animate-spin' icon='system-uicons:loader' />
                                )}
                            </div>
                        )}
                    </div>
                    <div className={classNames('w-72 max-h-96 h-64', 'bg-white shadow-lg rounded-lg px-5 py-3 z-50')}>
                        <p>Recent</p>
                        <div className='mt-3'>
                            {data &&
                                data.map((user) => (
                                    <div key={user._id} className='relative mb-2'>
                                        <Link to={user.userName} className='absolute inset-0'></Link>
                                        <AccountItem user={user} />
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </OverLay>
        </div>
    )
}

export default SearchMobile
