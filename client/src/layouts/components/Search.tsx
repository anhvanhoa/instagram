import { useEffect, useState } from 'react'
import SearchInput from './SearchInput'
import { User } from '~/types/auth'
import { users as listUser } from '~/mockup'
import AccountItem from '~/components/AccountItem'
interface Props {
    handleClickOutside: (event: MouseEvent) => void
}
const Search: React.FC<Props> = ({ handleClickOutside }) => {
    const [users] = useState<User[]>(listUser)
    // handle click outside
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [handleClickOutside])
    return (
        <div>
            <h2 className='my-2 px-6 pt-3 pb-9 font-semibold text-2xl'>Tìm kiếm</h2>
            <div className='overflow-hidden flex flex-col'>
                <SearchInput />
                <div className='pt-3 overflow-auto scroll-smooth'>
                    {users.length === 0 ? (
                        <div>
                            <div className='flex items-center justify-between my-[6px] px-6'>
                                <h3 className='font-semibold'>Gần đây</h3>
                            </div>
                            <div className='mt-4 overflow-auto flex-1 text-center h-6'>Không có dữ liệu</div>
                        </div>
                    ) : (
                        <>
                            {users.map((user) => (
                                <div key={user._id} className='py-2 px-6 hover:bg-gray-100'>
                                    <AccountItem user={user} />
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Search
