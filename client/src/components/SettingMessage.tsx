import { Icon } from '@iconify/react'
import Button from './Button'
import React from 'react'
interface Props {
    onClick: () => void
}
const SettingMessage: React.FC<Props> = ({ onClick }) => {
    return (
        <ul className='min-w-[100px]'>
            <Button
                iconL={<Icon icon='mdi:bin-outline' />}
                onClick={onClick}
                type='text'
                className='text-red-500 hover:text-red-600'
            >
                Recall
            </Button>
        </ul>
    )
}

export default SettingMessage
