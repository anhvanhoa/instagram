import { memo } from 'react'
interface Props {
    children?: string
    valueDefault: number | string
    data: number[] | string[]
    setValue: (event: React.ChangeEvent<HTMLSelectElement>) => void
}
const Select = memo(({ data, setValue, children, valueDefault }: Props) => {
    return (
        <div>
            <select
                defaultValue={valueDefault}
                onChange={setValue}
                className='text-xs py-2 px-1 rounded-sm text-gray-500 border border-solid border-[#ccc]/50'
            >
                {data.map((element) => (
                    <option key={element} value={element}>
                        {children} {element}
                    </option>
                ))}
            </select>
        </div>
    )
})

export default Select
