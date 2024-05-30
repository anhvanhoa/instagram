import classNames from 'classnames'
import React, { memo } from 'react'
import images from '~/assets'

interface Props {
    src: string
    alt?: string
    className?: string
    link?: string
    onClick?: () => void
    onDoubleClick?: () => void
    isCircle?: boolean
    ratio?: string
}
const Img: React.FC<Props> = memo(
    ({ src, alt, className, onClick, onDoubleClick, isCircle, ratio = '1' }) => {
        const baseUrl = `${import.meta.env.VITE_URL}/images`
        const fullUrl = src.startsWith('/') ? `${baseUrl}${src}` : `${baseUrl}/${src}`
        return (
            <div
                className={classNames(
                    {
                        'w-full h-full': className,
                        'rounded-full': isCircle,
                    },
                    'overflow-hidden',
                )}
            >
                <div
                    style={{ aspectRatio: ratio }}
                    className={classNames('w-full bg-gray-100 h-full')}
                >
                    <img
                        onDoubleClick={onDoubleClick}
                        onClick={onClick}
                        loading='lazy'
                        src={fullUrl}
                        className={classNames(className)}
                        alt={alt}
                        onError={(e) => {
                            e.currentTarget.src = images.noAvatar
                        }}
                    />
                </div>
            </div>
        )
    },
)

export default Img
