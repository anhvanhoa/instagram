import IconApp from '~/assets/icons/IconApp'
interface Props {
    like: boolean
    apiDislike: () => void
    apiLike: () => void
    viewPosts: () => void
}
const InteractPosts: React.FC<Props> = ({ apiDislike, apiLike, like, viewPosts }) => {
    return (
        <div>
            <div className='flex items-center justify-between mt-4'>
                <div className='flex items-center gap-4'>
                    <span className='cursor-pointer' onClick={like ? apiDislike : apiLike}>
                        {!like && <IconApp type='heart-posts' className={'transition-all w-6 hover:scale-110'} />}
                        {like && <IconApp type='heart-posts-red' className={'transition-all w-6 hover:scale-110'} />}
                    </span>
                    <span onClick={viewPosts} className='cursor-pointer transition-all w-6 hover:scale-110'>
                        <IconApp type='comment' />
                    </span>
                    <span className='cursor-pointer transition-all w-6 hover:scale-110'>
                        <IconApp type='share' />
                    </span>
                </div>
                <div className='flex items-center'>
                    <span className='cursor-pointer transition-all w-6 hover:scale-110'>
                        <IconApp type='saved-posts' />
                    </span>
                </div>
            </div>
        </div>
    )
}

export default InteractPosts
