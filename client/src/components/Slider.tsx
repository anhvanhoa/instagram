import { Icon } from '@iconify/react/dist/iconify.js'
import classNames from 'classnames'
import React, { memo, useState } from 'react'
interface Props {
    children: React.ReactNode
    maxElemnt: number
}
const Slider: React.FC<Props> = memo(({ children, maxElemnt }) => {
    const dots: number[] = []
    for (let index = 0; index < maxElemnt; index++) {
        dots.push(index)
    }
    const [position, setPosition] = useState(0)
    const handleSlider = (type: 'next' | 'prev') => () => {
        if (type === 'next') setPosition((prev) => prev + 1)
        if (type === 'prev') setPosition((prev) => prev - 1)
    }
    return (
        <div className='relative overflow-hidden'>
            <div className={`transition-all flex`} style={{ transform: `translateX(-${position * 100}%)` }}>
                {children}
            </div>
            <div
                className={classNames('absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1', {
                    hidden: maxElemnt === 1,
                })}
            >
                {dots.map((_, index) => (
                    <div
                        key={index}
                        className={`w-[7px] h-[7px] rounded-[50%] transition-all ${
                            index === position ? 'bg-white' : 'bg-white/70'
                        }`}
                    ></div>
                ))}
            </div>
            {position !== 0 && (
                <div className='absolute text-white bg-black/70 cursor-pointer rounded-[50%] w-7 h-7 top-1/2 -translate-y-1/2 left-2'>
                    <Icon onClick={handleSlider('prev')} icon='formkit:left' className='p-1' />
                </div>
            )}
            {position !== maxElemnt - 1 && maxElemnt > 1 && (
                <div className='absolute text-white bg-black/70 cursor-pointer rounded-[50%] w-7 h-7 top-1/2 -translate-y-1/2 right-2'>
                    <Icon onClick={handleSlider('next')} icon='formkit:right' className='p-1' />
                </div>
            )}
        </div>
    )
})

export default Slider
