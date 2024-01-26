import { useState } from 'react'
import { Icon } from '@iconify/react'
import useDebounce from '~/hooks/useDebounce'
import classNames from 'classnames'
interface Props {
    value: string
    setValue: (value: React.SetStateAction<string>) => void
    isLoading: boolean
}
const SearchInput = ({ value, setValue, isLoading }: Props) => {
    const [iconSearch, setIconSearch] = useState<boolean>(true)
    const newValue = useDebounce(value, 500)
    const handleSearch = () => setIconSearch(false)
    const handleClear = () => {
        setValue('')
        setIconSearch(true)
    }
    // set value search
    const handleValue = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value)
    return (
        <div className='mx-4'>
            <div className='mb-4 h-10 relative overflow-hidden rounded-md border border-second'>
                {iconSearch || (
                    <input
                        autoFocus
                        type='text'
                        className={classNames(
                            'py-1 px-4 bg-transparent w-full outline-none h-full',
                            'border-none z-10 placeholder:font-thin border border-second',
                        )}
                        placeholder='Tìm kiếm'
                        value={value}
                        onChange={handleValue}
                        onBlur={() => {
                            setTimeout(() => setIconSearch(true), 300)
                        }}
                    />
                )}
                {iconSearch && (
                    <div
                        className='absolute top-0 left-3 flex items-center w-full h-full dark:text-second cursor-text'
                        onClick={handleSearch}
                    >
                        <span className='mt-[2px] mr-[10px]'>
                            <Icon className='text-2xl' icon='basil:search-solid' />
                        </span>
                        <span className='overflow-hidden w-28 text-ellipsis select-none '>{value || 'Tìm kiếm'}</span>
                        <span className='w-8 flex-shrink'></span>
                    </div>
                )}
                <div className='opacity-50 absolute right-4 top-1/2 w-4 h-4 -translate-y-1/2 block '>
                    {!iconSearch && !isLoading && (
                        <Icon
                            onClick={handleClear}
                            className='text-gray-400 cursor-pointer'
                            icon='icon-park-solid:close-one'
                        />
                    )}
                    {!newValue && isLoading && <Icon icon='nonicons:loading-16' />}
                </div>
            </div>
        </div>
    )
}

export default SearchInput
