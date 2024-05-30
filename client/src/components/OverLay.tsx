import { Icon } from '@iconify/react'
import classNames from 'classnames'
import { useEffect } from 'react'
interface Props {
    children: React.ReactNode
    onClose?: () => void
    iconClose?: boolean
    className?: string
    zIndex?: number
}
const OverLay = ({ children, onClose, iconClose, className, zIndex = 300 }: Props) => {
    useEffect(() => {
        window.document.body.classList.add('is-scroll')
        window.document.body.classList.add('group')
        return () => {
            window.document.body.classList.remove('is-scroll')
            window.document.body.classList.remove('group')
        }
    }, [])
    return (
        <section
            className={classNames(
                'fixed inset-0 flex items-center justify-center',
                className,
            )}
            style={{ zIndex: zIndex }}
        >
            {iconClose && (
                <div
                    onClick={onClose}
                    className='absolute top-4 right-4 text-white z-[100] cursor-pointer'
                >
                    <Icon icon='carbon:close' />
                </div>
            )}
            <div
                className='absolute inset-0 bg-black dark:bg-third opacity-40'
                onClick={onClose}
            ></div>
            <div className='z-[111]'>{children}</div>
        </section>
    )
}

export default OverLay
