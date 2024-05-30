import classNames from 'classnames'
import { useEffect, useState } from 'react'
import images from '~/assets'

interface Props {
    profile: {
        avatar: string
        userName: string
    }
    classname?: string
}

const Image = ({ src }: { src: string }) => {
    const baseUrl = `${import.meta.env.VITE_URL}/images`
    let fullUrl = src.startsWith('/') ? `${baseUrl}${src}` : `${baseUrl}/${src}`
    if (!src) fullUrl = images.noAvatar
    return (
        <svg className='w-24 h-24 sm:w-40 sm:h-40 object-cover rounded-full'>
            <linearGradient id='my-gradient' x1='0%' y1='100%' x2='100%' y2='0%'>
                <stop offset='5%' stopColor='#F4A14B' />
                <stop offset='50%' stopColor='#E1306C' />
                <stop offset='100%' stopColor='#A233FA' />
            </linearGradient>
            <image href={fullUrl} className='size-full p-3' clipPath='url(#avatarClip)' />
            <clipPath id='avatarClip'>
                <circle
                    cx='90%'
                    cy='90%'
                    r='45%'
                    className='-translate-x-[40%] -translate-y-[40%]'
                />
            </clipPath>
            <circle
                cx='100%'
                cy='100%'
                r='50%'
                fill='none'
                stroke='url(#my-gradient)'
                strokeWidth='6'
                className='-translate-x-1/2 -translate-y-1/2'
            />
        </svg>
    )
}

const Avatar = ({ profile, classname }: Props) => {
    const [resize, setResize] = useState(false)
    const handleResize = () => {
        if (window.innerWidth < 640) {
            setResize(true)
        } else {
            setResize(false)
        }
    }
    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])
    return (
        <div>
            <div
                className={classNames(
                    'px-0 sm:px-8 md:px-10 sm:py-2 relative',
                    classname,
                )}
            >
                <div>
                    {!resize && <Image src={profile.avatar} />}
                    {resize && <Image src={profile.avatar} />}
                </div>
            </div>
        </div>
    )
}

export default Avatar
