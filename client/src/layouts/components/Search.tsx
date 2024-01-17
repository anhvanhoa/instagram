import { useEffect, useState } from 'react'
import SearchInput from './SearchInput'
import AccountItem from '~/components/AccountItem'
import { Link } from 'react-router-dom'
import useDebounce from '~/hooks/useDebounce'
import { useQuery } from '@tanstack/react-query'
import serachUser from '~/apis/serachUser'
interface Props {
    handleClickOutside: (event: MouseEvent) => void
}
const Search: React.FC<Props> = ({ handleClickOutside }) => {
    const [value, setValue] = useState<string>('')
    const newValue = useDebounce(value, 500)
    const { data, isLoading } = useQuery({
        queryKey: ['search', newValue],
        queryFn: () => serachUser(newValue),
        initialData: [],
        enabled: Boolean(newValue),
    })
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
                <SearchInput isLoading={isLoading} setValue={setValue} value={value} />
                <div className='pt-1 overflow-auto scroll-smooth'>
                    {!data && (
                        <div>
                            <div className='flex items-center justify-between my-[6px] px-6'>
                                <h3 className='font-semibold'>Gần đây</h3>
                            </div>
                            <div className='mt-4 overflow-auto flex-1 text-center h-6'>Không có dữ liệu</div>
                        </div>
                    )}
                    {data &&
                        data.map((user) => (
                            <div key={user._id} className='py-2 px-6 hover:bg-gray-100 relative'>
                                <Link to={user.userName} className='absolute inset-0'></Link>
                                <AccountItem user={user} />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default Search
