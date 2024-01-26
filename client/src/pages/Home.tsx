import classNames from 'classnames'
import HeaderHomeMobile from '~/components/HeaderHomeMobile'
import HomeSuggest from '~/components/HomeSuggest'
import PostsHome from '~/components/PostsHome'
import StoryItem from '~/components/StoryItem'
import Suggest from '~/components/Suggest'
import useContextUser from '~/store/hook'
const Home = () => {
    const { state } = useContextUser()
    return (
        <main className='flex-1'>
            <HeaderHomeMobile />
            <div className={classNames('flex justify-center')}>
                <div className='flex-1 border-second xl:border-r'>
                    <div className={classNames('py-2 px-4 hidden')}>
                        <div className={classNames('flex gap-x-4')}>
                            <StoryItem
                                avatar='https://anhvanhoa.com/image/avatar.jpg'
                                userName='Tin của bạn'
                                isStory={false}
                                to='/story/anhvhoa'
                            />
                        </div>
                    </div>
                    <div className={classNames('px-2 xs:px-4 sm:px-8 max-w-full xs:max-w-lg w-full mx-auto')}>
                        {state.following.length === 0 && <HomeSuggest />}
                        {state.following.length !== 0 && <PostsHome />}
                    </div>
                </div>
                <div className='xl:block hidden sticky top-0 h-full'>
                    <Suggest />
                </div>
            </div>
        </main>
    )
}

export default Home
