import React, { ReactNode } from 'react'
import OverLay from './OverLay'
import Button from './Button'
interface Props {
    title: string
    textCancel?: ReactNode
    textAgree?: ReactNode
    onAgree?: () => void
    onCancel?: () => void
}
const Alert: React.FC<Props> = ({ onAgree, onCancel, textAgree = 'Confirm', textCancel = 'Cancel', title }) => {
    return (
        <div>
            <OverLay onClose={onCancel}>
                <div
                    id='alert-additional-content-2'
                    className='p-4 mb-4 text-red-800 border border-red-300 rounded-lg bg-white'
                    role='alert'
                >
                    <div className='flex items-center'>
                        <svg
                            className='flex-shrink-0 w-4 h-4 me-2'
                            aria-hidden='true'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                        >
                            <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z' />
                        </svg>
                        <span className='sr-only'>Info</span>
                        <h3 className='text-lg font-medium'>{title}</h3>
                    </div>
                    <div className='flex mt-3 gap-3'>
                        <Button onClick={onAgree} size='small' className='bg-red-600 hover:bg-red-700'>
                            {textAgree}
                        </Button>
                        <button
                            onClick={onCancel}
                            type='button'
                            className='text-gray-800 bg-transparent border border-gray-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center'
                            data-dismiss-target='#alert-additional-content-2'
                            aria-label='Close'
                        >
                            {textCancel}
                        </button>
                    </div>
                </div>
            </OverLay>
        </div>
    )
}

export default Alert
