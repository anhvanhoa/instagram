import Button from './Button'
import React from 'react'
interface Props {
    onClick: () => void
    onRecall?: () => void
    time: string
    isRecall?: boolean
}
const SettingMessage: React.FC<Props> = ({ onClick, time, isRecall = false, onRecall }) => {
    const date = new Date(time)
    const timeFormat = date.toLocaleTimeString('en', {
        weekday: 'short',
        minute: '2-digit',
        hour: '2-digit',
    })
    return (
        <ul className='min-w-20'>
            <li className='px-1 py-1 text-xs font-medium border-b'>{timeFormat}</li>
            <li className='px-2 hover:bg-gray-200/60 rounded-md mt-1'>
                <Button onClick={onClick} type='text' className='-mx-2 text-left text-xs py-1 !text-black'>
                    Delete
                </Button>
            </li>
            {isRecall && (
                <li onClick={onRecall} className='px-2 hover:bg-gray-200/60 rounded-md'>
                    <Button type='text' className='-mx-2 text-left text-xs py-1 !text-black'>
                        Forward
                    </Button>
                </li>
            )}
        </ul>
    )
}

export default SettingMessage
