import React from 'react'
import { Icon } from '@iconify/react'
import classNames from 'classnames'

type ButtonSize = 'custom' | 'small' | 'large' | 'medium' | 'extraLarge'
type ButtonType = 'custom' | 'primary' | 'text' | 'second'

interface Props {
    children: React.ReactNode
    iconL?: React.ReactNode
    iconR?: React.ReactNode
    size?: ButtonSize
    type?: ButtonType
    disable?: boolean
    className?: string
    loading?: boolean
    onClick?: () => void
    onKeyDown?: () => void
}
const Button: React.FC<Props> = ({
    children,
    iconL,
    iconR,
    size = 'medium',
    type = 'primary',
    disable,
    className,
    loading,
    onClick,
}) => {
    const buttonSize: Record<ButtonSize, string> = {
        custom: '',
        small: 'w-24',
        medium: 'w-32',
        large: 'w-56',
        extraLarge: 'w-72',
    }
    const buttonType: Record<ButtonType, string> = {
        custom: '',
        primary: 'bg-primary text-white hover:bg-hover-btn-primary rounded-md',
        text: 'text-primary hover:text-hover-button',
        second: 'bg-second rounded-md',
    }
    if (type === 'text') size = 'custom'
    const disableCls = disable ? 'opacity-70 pointer-events-none' : ''
    const allClass: string = `text-sm flex items-center justify-center select-none py-1.5 font-medium ${className} ${buttonSize[size]} ${buttonType[type]} ${disableCls}`
    return (
        <button onClick={onClick} type='button' className={classNames(allClass)}>
            {loading && <Icon className='w-3.5 h-3.5 animate-spin my-[3px]' icon='nonicons:loading-16' />}
            {!loading && (
                <>
                    <span>{iconL}</span>
                    <span className='mx-2'>{children}</span>
                    <span>{iconR}</span>
                </>
            )}
        </button>
    )
}

export default Button
