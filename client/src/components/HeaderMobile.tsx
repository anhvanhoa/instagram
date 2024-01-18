import { Icon } from '@iconify/react/dist/iconify.js'
import React, { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
interface Props {
    title: string
    contextNext?: ReactNode
    onNext?: () => void
}
const HeaderMobile: React.FC<Props> = ({ onNext, title, contextNext }) => {
    const navifate = useNavigate()
    const handleBack = () => navifate(-1)
    return (
        <div>
            <div>
                <div className='flex justify-between items-center px-4 py-3 border-b'>
                    <div onClick={handleBack}>
                        <Icon
                            icon='formkit:left'
                            className='text-2xl px-2 py-px cursor-pointer hover:bg-gray-100 hover:scale-110 transition-all rounded-lg'
                        />
                    </div>
                    <div>
                        <p className='font-semibold'>{title}</p>
                    </div>
                    <div onClick={onNext}>{contextNext}</div>
                </div>
            </div>
        </div>
    )
}

export default HeaderMobile
