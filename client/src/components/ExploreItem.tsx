import React from 'react'
import { ResponsePost } from '~/types/posts'
import Img from './Img'
import { Icon } from '@iconify/react'
import classNames from 'classnames'
interface Props {
    post: ResponsePost
}
const ExploreItem: React.FC<Props> = ({ post }) => {
    return (
        <div className={classNames('relative group/explore')}>
            <Img
                className='aspect-square object-cover'
                src={post.media[0].content}
                alt={post.media[0].content}
            />
            <div className='absolute top-2 right-2'>
                {post.media.length > 1 && (
                    <Icon
                        className='text-sm md:text-xl lg:text-2xl text-white'
                        icon='ion:copy'
                    />
                )}
            </div>
            <div
                className={classNames(
                    'absolute inset-0 bg-[#2d2d2d66] ',
                    'items-center justify-center gap-x-8',
                    'group-hover/explore:flex hidden transition-all',
                )}
            >
                <div className='text-white flex items-center'>
                    <Icon className='text-xl size-5' icon='mdi:heart' />
                    <span className='pl-1.5 text-xl font-bold'>{post.likeTotal}</span>
                </div>
                <div className='text-white flex items-center'>
                    <Icon className='text-xl size-5' icon='fe:comment' />
                    <span className='pl-1.5 text-xl font-bold'>{post.commentTotal}</span>
                </div>
            </div>
        </div>
    )
}

export default ExploreItem
