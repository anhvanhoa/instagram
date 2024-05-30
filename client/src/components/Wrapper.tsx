import React from 'react'
import classNames from 'classnames'
interface Props {
    children: React.ReactNode
    classname?: string
    isStopPropagation?: boolean
}
const Wrapper: React.FC<Props> = ({ children, classname, isStopPropagation }) => {
    return (
        <div
            onClick={(e) => isStopPropagation && e.stopPropagation()}
            className={classNames(
                'rounded-3xl bg-white w-full overflow-hidden transition-all duration-200 ease-in-out',
                classname,
            )}
        >
            <div className='overflow-y-auto max-h-[585px] scrollbar'>{children}</div>
        </div>
    )
}

export default Wrapper
