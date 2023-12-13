import React from 'react'
import icons, { NameIcon } from './data'
import classNames from 'classnames'
interface Props {
    type: NameIcon
    className?: string
}
const IconApp: React.FC<Props> = ({ type, className }) => {
    return <div className={classNames(className, 'h-6 w-6')}>{icons[type]}</div>
}

export default IconApp
