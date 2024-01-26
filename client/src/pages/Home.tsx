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
        <main className='h-full'>
            <HeaderHomeMobile />
            <div className='flex justify-center h-full overflow-hidden'>
                <div className='flex-1 border-second xl:border-r overflow-auto scrollbar'>
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
                    <div className='px-2 xs:px-4 sm:px-8 max-w-full xs:max-w-lg w-full mx-auto'>
                        {state.following.length === 0 && <HomeSuggest />}
                        {state.following.length !== 0 && <PostsHome />}
                    </div>
                </div>
                <div className='xl:block hidden h-full overflow-auto scrollbar-hidden'>
                    <Suggest />
                </div>
            </div>
        </main>
    )
}

export default Home
