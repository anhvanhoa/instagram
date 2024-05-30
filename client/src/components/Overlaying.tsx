/**
 * Renders an overlay component with the given props.
 *
 * @param {Props} props - The props for the Overlay component.
 * @param {number} props.zIndex - The z-index of the overlay. Defaults to 300.
 * @param {React.ReactNode} props.children - The content to be rendered inside the overlay.
 * @param {boolean} props.initOverlay - Whether the overlay is initially visible. Defaults to false.
 * @param {React.ReactNode} props.Element - The element to be rendered inside the overlay.
 * @param {boolean} props.isIconClose - Whether the close icon should be displayed. Defaults to false.
 * @return {JSX.Element} The rendered Overlay component.
 */

import { Icon } from '@iconify/react/dist/iconify.js'
import classNames from 'classnames'
import React, { useState } from 'react'

type Props = {
    zIndex?: number
    children?: React.ReactNode
    initOverlay?: boolean
    onClose?: () => void
    render?: ({
        changeOverlay,
    }: {
        changeOverlay: (isOvelay: boolean) => void
    }) => React.ReactNode
    isIconClose?: boolean
    Component?: React.ReactNode
}
const fnDefault = () => null
const Overlay: React.FC<Props> = ({
    zIndex = 300,
    children,
    initOverlay = false,
    render = fnDefault,
    onClose = fnDefault,
    Component,
    isIconClose,
}) => {
    const [overlay, setOverlay] = useState(initOverlay)
    const changeOverlay = (isOvelay: boolean) => () => {
        setTimeout(() => {
            setOverlay(isOvelay)
            if (!isOvelay) onClose()
        }, 20)
    }
    return (
        <>
            {overlay && (
                <div style={{ zIndex, position: 'absolute' }}>
                    <div
                        className={classNames(
                            'fixed top-0 left-0 w-full h-full',
                            'flex items-center bg-black/50 z-10',
                        )}
                        onClick={initOverlay ? onClose : changeOverlay(false)}
                    >
                        <div className='text-white cursor-pointer size-8 z-20 absolute top-4 right-4 hover:bg-gray-50/10 rounded-xl transition-all'>
                            <Icon
                                style={{ display: isIconClose ? 'none' : 'block' }}
                                onClick={initOverlay ? onClose : changeOverlay(false)}
                                icon='carbon:close'
                            />
                        </div>
                    </div>
                    <div className='w-full z-20 fixed top-1/2 -translate-y-1/2 left-0 right-0'>
                        <div
                            className='flex justify-center px-8 sm:px-12 animate-zoom'
                            onClick={changeOverlay(false)}
                        >
                            {render({
                                changeOverlay: setOverlay,
                            })}
                            {Component}
                        </div>
                    </div>
                </div>
            )}
            {initOverlay || <span onClick={changeOverlay(true)}>{children}</span>}
        </>
    )
}

export default Overlay
