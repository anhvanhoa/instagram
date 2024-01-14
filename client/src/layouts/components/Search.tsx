import { useEffect, useState } from 'react'
import SearchInput from './SearchInput'
import { User } from '~/types/auth'
import AccountItem from '~/components/AccountItem'
import { useNavigate } from 'react-router-dom'
interface Props {
    handleClickOutside: (event: MouseEvent) => void
    onHidden: () => void
}
const Search: React.FC<Props> = ({ handleClickOutside, onHidden }) => {
    const [users, setUsers] = useState<User[]>([])
    const navigate = useNavigate()
    const handleUser = (userName: string) => () => {
        navigate(`/${userName}`)
        onHidden()
    }
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
                <SearchInput setUsers={setUsers} />
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
                                <div
                                    onClick={handleUser(user.userName)}
                                    key={user._id}
                                    className='py-2 px-6 hover:bg-gray-100 cursor-pointer'
                                >
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
