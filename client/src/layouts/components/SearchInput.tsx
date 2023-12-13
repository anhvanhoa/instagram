import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import useDebounce from '~/hooks/useDebounce'
const SearchInput = () => {
    const [iconSearch, setIconSearch] = useState<boolean>(true)
    const [hideIcon, setHideIcon] = useState<boolean>(false)
    const [value, setValue] = useState<string>('')
    const newValue = useDebounce(value, 500)
    const handleSearch = () => setIconSearch(false)
    const handleClear = () => {
        setValue('')
        setIconSearch(true)
    }
    const handleApi = (value: string) => {
        setHideIcon(true)
        setTimeout(() => {
            setHideIcon(false)
            console.log(value)
        }, 1000)
    }
    useEffect(() => {
        handleApi(newValue)
    }, [newValue])
    // set value search
    const handleValue = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value)
    return (
        <div className='mx-4'>
            <div className='mb-6 h-10 relative overflow-hidden rounded-md bg-gray-100'>
                {iconSearch || (
                    <input
                        autoFocus
                        type='text'
                        className='py-1 px-4 bg-gray-100 w-full outline-none h-full border-none z-10 text-black placeholder:font-thin'
                        placeholder='Tìm kiếm'
                        value={value}
                        onChange={handleValue}
                        onBlur={() => setIconSearch(true)}
                    />
                )}
                {iconSearch && (
                    <div
                        className='absolute top-0 left-3 flex items-center w-full h-full text-[#909090] cursor-text'
                        onClick={handleSearch}
                    >
                        <span className='mt-[2px] mr-[10px]'>
                            <Icon className='text-2xl' icon='basil:search-solid' />
                        </span>
                        <span className='overflow-hidden w-28 text-ellipsis font-thin text-[#909090] select-none '>
                            {value || 'Tìm kiếm'}
                        </span>
                        <span className='w-8 flex-shrink'></span>
                    </div>
                )}
                <div className='opacity-50 absolute right-4 top-1/2 w-4 h-4 -translate-y-1/2 block '>
                    {!iconSearch && !hideIcon && (
                        <Icon
                            onClick={handleClear}
                            className='text-gray-400 cursor-pointer'
                            icon='icon-park-solid:close-one'
                        />
                    )}
                    {hideIcon && <Icon icon='nonicons:loading-16' />}
                </div>
            </div>
        </div>
    )
}

export default SearchInput
