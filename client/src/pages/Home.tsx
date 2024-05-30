import classNames from 'classnames'
import images from '~/assets'
import HeaderHomeMobile from '~/components/HeaderHomeMobile'
import HomeSuggest from '~/components/HomeSuggest'
import PostsHome from '~/components/PostsHome'
import StoryItem from '~/components/StoryItem'
import Suggest from '~/components/Suggest'
import useAuth from '~/hooks/useAuth'
import useResize from '~/hooks/useResize.hook'

let totalFollowing = 0

const Home = () => {
    const { user } = useAuth()
    totalFollowing = user.totalFollowing
    const resize = useResize()
    return (
        <main className='max-h-screen overflow-y-auto scrollbar'>
            {!resize && <HeaderHomeMobile />}
            <div className='flex justify-center'>
                <div className='flex-1'>
                    <div className={classNames('py-2 px-4 hidden')}>
                        <div className={classNames('flex gap-x-4')}>
                            <StoryItem
                                avatar={images.noAvatar}
                                userName='Tin của bạn'
                                isStory={false}
                                to='/story/anhvhoa'
                            />
                        </div>
                    </div>
                    <div className='px-2 xs:px-4 max-w-full xs:max-w-lg w-full mx-auto'>
                        {totalFollowing === 0 ? <HomeSuggest /> : <PostsHome />}
                    </div>
                </div>
                <div className='xl:block hidden h-full overflow-auto scrollbar-hidden mt-2 mr-20'>
                    <Suggest />
                </div>
            </div>
        </main>
    )
}

export default Home
