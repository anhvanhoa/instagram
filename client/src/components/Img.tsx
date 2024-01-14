import React from 'react'
import images from '~/assets'

interface Props {
    src: string
    alt?: string
    className?: string
    link?: string
    faback?: () => string
}
const Img: React.FC<Props> = ({ src, alt, className, faback = () => images.noAvatar }) => {
    src = src ? `${import.meta.env.VITE_URL}/images/` + src : images.noAvatar
    return <img src={src} className={className} alt={alt} onError={(e) => (e.currentTarget.src = faback())} />
}

export default Img
