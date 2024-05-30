import { Icon } from '@iconify/react/dist/iconify.js'
import classNames from 'classnames'
import React from 'react'
import { stopPropagation } from '~/utils/helper'

type Props = {
    title: string
    subtitle?: string
    isSticky?: boolean
    onBack?: () => void
}

const HeaderOption: React.FC<Props> = ({ subtitle, title, onBack, isSticky }) => {
    return (
        <>
            <div
                onClick={stopPropagation(true)}
                className={classNames(
                    'bg-white flex items-center justify-between border-b px-2',
                    {
                        'sticky z-10 top-0': isSticky,
                    },
                )}
            >
                <div
                    onClick={onBack}
                    className='hover:bg-gray-100 cursor-pointer p-1 rounded-lg'
                >
                    <Icon icon='uiw:left' width='18' height='18' />
                </div>
                <h4 className='text-center py-3 font-semibold'>{title}</h4>
                <div className='opacity-0'>
                    <Icon icon='uiw:right' width='18' height='18' />
                </div>
            </div>
            {subtitle && (
                <div onClick={stopPropagation(true)}>
                    <p className='py-3 font-semibold px-4 border-b'>{subtitle}</p>
                </div>
            )}
        </>
    )
}

export default HeaderOption
