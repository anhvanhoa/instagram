import { Icon } from '@iconify/react'
import { useEffect } from 'react'
interface Props {
    children: React.ReactNode
    onClose?: () => void
    iconClose?: boolean
}
const OverLay = ({ children, onClose, iconClose }: Props) => {
    useEffect(() => {
        window.document.body.classList.add('is-scroll')
        window.document.body.classList.add('group')
        return () => {
            window.document.body.classList.remove('is-scroll')
            window.document.body.classList.remove('group')
        }
    }, [])
    return (
        <section className='fixed inset-0 z-[1000] flex items-center justify-center'>
            {iconClose && (
                <div onClick={onClose} className='absolute top-4 right-4 text-white z-[100] cursor-pointer'>
                    <Icon icon='carbon:close' />
                </div>
            )}
            <div className='absolute inset-0 bg-[#000000d6]/60' onClick={onClose}></div>
            <div className='z-[111]'>{children}</div>
        </section>
    )
}

export default OverLay
