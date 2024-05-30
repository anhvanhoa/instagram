import React, { Fragment } from 'react'
import { Icon } from '@iconify/react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

type ButtonSize = 'custom' | 'small' | 'large' | 'medium' | 'extraLarge'
type ButtonType = 'custom' | 'primary' | 'text' | 'second' | 'block'

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
    onMouseUp?: () => void
    isStopPropagation?: boolean
    to?: string
    isHidden?: boolean
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
    isStopPropagation,
    to,
    isHidden = false,
    onClick,
    onKeyDown,
    onMouseUp,
}) => {
    const Component = to ? Link : 'button'
    const buttonSize: Record<ButtonSize, string> = {
        custom: '',
        small: 'w-24',
        medium: 'w-32',
        large: 'w-56',
        extraLarge: 'w-72',
    }
    const buttonType: Record<ButtonType, string> = {
        custom: '',
        primary: 'bg-primary text-white hover:bg-hover-btn-primary rounded-lg',
        text: 'text-primary hover:text-hover-button',
        second: 'bg-second rounded-lg',
        block: 'w-full',
    }
    if (type === 'text') size = 'custom'
    const disableCls = disable ? 'opacity-70 pointer-events-none' : ''
    const allClass: string = `
    text-sm flex items-center justify-center select-none py-1.5 p-2
    font-medium ${className} ${buttonSize[size]} 
    ${buttonType[type]} ${disableCls}`
    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLButtonElement | HTMLAnchorElement>,
    ) => {
        if (e.key === 'Enter') {
            onKeyDown && onKeyDown()
        }
    }
    return (
        <Fragment>
            {!isHidden && (
                <div onClick={(e) => isStopPropagation && e.stopPropagation()}>
                    <Component
                        to={to ?? ''}
                        onMouseUp={onMouseUp}
                        onKeyDown={handleKeyDown}
                        onClick={onClick}
                        className={classNames(allClass)}
                        type='button'
                    >
                        {loading && (
                            <Icon
                                className='w-3.5 h-3.5 animate-spin my-[3px]'
                                icon='nonicons:loading-16'
                            />
                        )}
                        {!loading && (
                            <>
                                {iconL && <span className='mr-1'>{iconL}</span>}
                                <span>{children}</span>
                                {iconR && <span className='mr-1'>{iconR}</span>}
                            </>
                        )}
                    </Component>
                </div>
            )}
        </Fragment>
    )
}

export default Button
