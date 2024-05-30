import React, { ReactNode } from 'react'
import Button from './Button'
import classNames from 'classnames'
import { stopPropagation } from '~/utils/helper'

export interface PropsAlert {
    head: {
        title: string
        description: string
    }
    agree: PropsButton
    cancel: PropsButton
    isPrimary?: boolean
    isStopPropagation?: boolean
}

type PropsButton = {
    text: string | ReactNode
    handle: () => void
}

const fnDefault = () => null
const initAgree: PropsButton = {
    text: 'Confirm',
    handle: fnDefault,
}
const initCancel: PropsButton = {
    text: 'Cancel',
    handle: fnDefault,
}
const Alert: React.FC<PropsAlert> = ({
    head,
    agree = initAgree,
    cancel = initCancel,
    isPrimary,
    isStopPropagation,
}) => {
    return (
        <div className='rounded-xl text-center' role='alert'>
            <div className='p-5' onClick={stopPropagation(isStopPropagation)}>
                <h3 className='text-xl'>{head.title}</h3>
                <p className='text-sm dark:text-gray-300 text-gray-500 mt-1.5'>
                    {head.description}
                </p>
            </div>
            <div className='flex flex-col mt-3 dark:*:border-gray-50/10'>
                <Button
                    onClick={agree.handle}
                    type='block'
                    className={classNames('py-3 border-t font-medium', {
                        'text-red-500 hover:text-red-600': !isPrimary,
                        'text-primary': isPrimary,
                    })}
                >
                    {agree.text}
                </Button>
                <Button
                    onClick={cancel.handle}
                    type='block'
                    className='py-3 border-t !text-black dark:!text-white font-normal'
                >
                    {cancel.text}
                </Button>
            </div>
        </div>
    )
}

export default Alert
