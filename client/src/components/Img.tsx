import React, { memo } from 'react'
import images from '~/assets'

interface Props {
    src: string
    alt?: string
    className?: string
    link?: string
}
const Img: React.FC<Props> = memo(({ src, alt, className }) => {
    src = src ? `${import.meta.env.VITE_URL}/images/` + src : images.noAvatar
    return (
        <img
            loading='lazy'
            src={src}
            className={className}
            alt={alt}
            onError={(e) => (e.currentTarget.src = images.noAvatar)}
        />
    )
})

export default Img
