import { Icon } from '@iconify/react/dist/iconify.js'
import React, { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
interface Props {
    className?: string
    title: string
    contextNext?: ReactNode
    onNext?: () => void
}
const HeaderMobile: React.FC<Props> = ({ onNext, title, contextNext, className }) => {
    const navifate = useNavigate()
    const handleBack = () => navifate(-1)
    return (
        <div className='sticky top-0 z-50'>
            <div className={className}>
                <div className='flex justify-between items-center px-4 py-3 border-second border-b bg-[rgba(var(--background-third-rgb),0.7)] backdrop-blur-xl'>
                    <div onClick={handleBack}>
                        <Icon
                            icon='formkit:left'
                            className='text-2xl px-2 py-px cursor-pointer hover:dark:bg-second hover:bg-gray-100 hover:scale-110 transition-all rounded-lg'
                        />
                    </div>
                    <div>
                        <p className='font-semibold line-clamp-1 px-4'>{title}</p>
                    </div>
                    <div className='min-w-[25px]' onClick={onNext}>
                        {contextNext}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderMobile
