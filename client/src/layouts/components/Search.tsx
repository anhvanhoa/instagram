import { useEffect, useState } from 'react'
import SearchInput from './SearchInput'
import AccountItem from '~/components/AccountItem'
import { Link } from 'react-router-dom'
import useDebounce from '~/hooks/useDebounce'
import { useSearchUser } from '~/hooks/user.hook'
interface Props {
    handleClickOutside: (event: MouseEvent) => void
    handleClose: () => void
}
const Search: React.FC<Props> = ({ handleClickOutside, handleClose }) => {
    const [value, setValue] = useState<string>('')
    const newValue = useDebounce(value, 500)
    const { data, isLoading } = useSearchUser({ value: newValue })
    // handle click outside
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [handleClickOutside])
    return (
        <div>
            <h2 className='my-2 px-4 py-6 font-semibold text-2xl'>Tìm kiếm</h2>
            <div className='overflow-hidden flex flex-col'>
                <SearchInput isLoading={isLoading} setValue={setValue} value={value} />
                <div className='pt-1 overflow-auto scroll-smooth'>
                    {!data && (
                        <div>
                            <div className='flex items-center justify-between my-[6px] px-6'>
                                <h3 className='font-semibold'>Gần đây</h3>
                            </div>
                            <div className='mt-4 overflow-auto flex-1 text-center h-6'>
                                Không có dữ liệu
                            </div>
                        </div>
                    )}
                    {data &&
                        data.users.map((user) => (
                            <div
                                key={user._id}
                                className='py-2 px-6 hover:bg-gray-50/5 relative'
                                onClick={handleClose}
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
        </div>
    )
}

export default Search
