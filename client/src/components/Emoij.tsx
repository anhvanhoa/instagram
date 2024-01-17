import React from 'react'
import { dataEmoij } from '~/mock/emoij'
interface Props {
    width?: number
    height?: number
    onSelect: (value: string) => void
}
const Emoij: React.FC<Props> = ({ height = 105, width = 250, onSelect }) => {
    const handleSelect = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => onSelect(e.currentTarget.innerText)
    return (
        <div
            className='overflow-auto select-none scroll-smooth rounded-lg shadow-sm border'
            style={{
                width,
                height,
            }}
        >
            <div className='grid grid-cols-6 gap-px bg-white p-2'>
                {dataEmoij.map((emoij, i) => (
                    <div
                        onClick={handleSelect}
                        className='text-xl cursor-pointer text-center p-px hover:bg-gray-200 rounded-md'
                        key={i}
                    >
                        {emoij}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Emoij
