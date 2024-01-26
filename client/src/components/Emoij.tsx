import classNames from 'classnames'
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
            className={classNames(
                'overflow-auto select-none scroll-smooth rounded-lg',
                'shadow-sm border border-gray-300 dark:border-gray-50/20 scrollbar-hidden',
            )}
            style={{
                width,
                height,
            }}
        >
            <div className='grid grid-cols-6 gap-px bg-white dark:bg-second p-2'>
                {dataEmoij.map((emoij, i) => (
                    <div
                        onClick={handleSelect}
                        className='text-xl cursor-pointer text-center p-px hover:dark:bg-gray-50/20 hover:bg-gray-100 rounded-md'
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
