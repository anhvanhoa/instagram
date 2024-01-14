import React, { memo } from 'react'
import icons, { NameIcon } from './data'
import classNames from 'classnames'
interface Props {
    type: NameIcon
    className?: string
}
const IconApp: React.FC<Props> = memo(({ type, className }) => {
    return (
        <div
            className={classNames(
                {
                    'h-6 w-6': !className,
                },
                className,
            )}
        >
            {icons[type]}
        </div>
    )
})

export default IconApp
