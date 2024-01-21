// import Button from './Button'
import images from '~/assets'

const EndPosts = () => {
    return (
        <div className='pt-6 pb-12 px-3 my-6 border-b border-solid flex items-center flex-col'>
            <div className='w-14 h-14 md:w-16 md:h-16'>
                <img src={images.checkBg} alt='' />
            </div>
            <p className='text-xl pt-2'>You're all caught up</p>
            <p className='text-sm text-[#737373]'>You've seen all new posts from the past 3 days.</p>
            {/* <Button type='text'>View older posts</Button> */}
        </div>
    )
}

export default EndPosts
