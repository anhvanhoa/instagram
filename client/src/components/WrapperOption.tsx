import React from 'react'
import Wrapper from './Wrapper'
import classNames from 'classnames'

type Props = {
    children?: React.ReactNode
    onCancel?: () => void
    classname?: string
}

const WrapperOption: React.FC<Props> = ({ children, classname }) => {
    return (
        <Wrapper classname={classNames('max-w-sm transition-all', classname, '')}>
            {children}
        </Wrapper>
    )
}

export default WrapperOption

type PropsButtom = {
    children?: React.ReactNode
    onClick?: () => void
    classname?: string
}

export const ButtonOption: React.FC<PropsButtom> = ({ children, onClick, classname }) => {
    return (
        <button
            onClick={onClick}
            className={classNames(
                'w-full bg-white text-black py-3 font-normal',
                classname,
            )}
        >
            {children}
        </button>
    )
}
