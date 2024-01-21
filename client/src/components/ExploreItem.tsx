import React from 'react'
import { Posts } from '~/types/posts'
import Img from './Img'
import { Icon } from '@iconify/react'
import classNames from 'classnames'
interface Props {
    posts: Posts
}
const ExploreItem: React.FC<Props> = ({ posts }) => {
    return (
        <div className={classNames('relative group/explore')}>
            <Img className='aspect-square object-cover rounded-sm' src={posts.contents[0]} alt={posts.contents[0]} />
            <div className='absolute top-2 right-2'>
                {posts.contents.length > 1 && (
                    <Icon className='text-sm md:text-xl lg:text-2xl text-white' icon='ion:copy' />
                )}
            </div>
            <div
                className={classNames(
                    'absolute inset-0 bg-[#2d2d2d66] ',
                    'items-center justify-center gap-x-5',
                    'group-hover/explore:flex hidden transition-all',
                )}
            >
                <div className='text-white flex items-center'>
                    <Icon className='text-xl' icon='mdi:heart' />
                    <span className='pl-1'>{posts.likes.length}</span>
                </div>
                <div className='text-white flex items-center'>
                    <Icon className='text-xl' icon='fe:comment' />
                    <span className='pl-1'>{posts.comments.length}</span>
                </div>
            </div>
        </div>
    )
}

export default ExploreItem
