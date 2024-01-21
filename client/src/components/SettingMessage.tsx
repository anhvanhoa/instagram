import Button from './Button'
import React from 'react'
interface Props {
    onClick: () => void
}
const SettingMessage: React.FC<Props> = ({ onClick }) => {
    return (
        <ul className=''>
            <Button onClick={onClick} type='text' className='text-red-500 hover:text-red-600 text-xs'>
                Delete
            </Button>
        </ul>
    )
}

export default SettingMessage
