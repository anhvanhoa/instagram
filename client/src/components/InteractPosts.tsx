import IconApp from '~/assets/icons/IconApp'
import { copyLinkPost } from '~/utils/helper'
interface Props {
    handleDislike: () => void
    handleLike: () => void
    viewPosts: () => void
    posts: {
        isLike: boolean
        _id: string
    }
}
const InteractPosts: React.FC<Props> = ({
    handleDislike,
    handleLike,
    posts,
    viewPosts,
}) => {
    const handleCopy = () => copyLinkPost(posts._id)
    return (
        <div>
            <div className='flex items-center justify-between mt-4 px-2'>
                <div className='flex items-center gap-4'>
                    <span
                        className='cursor-pointer'
                        onClick={posts.isLike ? handleDislike : handleLike}
                        title='Like'
                    >
                        {!posts.isLike && (
                            <IconApp
                                type='heart-posts'
                                className={'transition-all w-6 hover:scale-110'}
                            />
                        )}
                        {posts.isLike && (
                            <IconApp
                                type='heart-posts-red'
                                className={'transition-all w-6 hover:scale-110'}
                            />
                        )}
                    </span>
                    <span
                        onClick={viewPosts}
                        className='cursor-pointer transition-all w-6 hover:scale-110'
                    >
                        <IconApp type='comment' />
                    </span>
                    <span
                        onClick={handleCopy}
                        title='Share link'
                        className='cursor-pointer transition-all w-6 hover:scale-110'
                    >
                        <IconApp type='share' />
                    </span>
                </div>
                <div className='flex items-center'>
                    <span
                        title='Saved posts'
                        className='cursor-pointer transition-all w-6 hover:scale-110'
                    >
                        <IconApp type='saved-posts' />
                    </span>
                </div>
            </div>
        </div>
    )
}

export default InteractPosts
