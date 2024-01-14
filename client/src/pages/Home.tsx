import classNames from 'classnames'
import HomeSuggest from '~/components/HomeSuggest'
import PostsHome from '~/components/PostsHome'
import Suggest from '~/components/Suggest'
import useContextUser from '~/store/hook'
const Home = () => {
    const { state } = useContextUser()
    return (
        <main className='flex-1'>
            <div className={classNames('flex', 'justify-center', 'mx-auto', 'pt-1')}>
                <div className={classNames('px-4 sm:px-8 md:mr-8 max-w-[630px] w-full')}>
                    {state.following.length === 0 && <HomeSuggest />}
                    {state.following.length !== 0 && <PostsHome />}
                </div>
                <div className='pl-10 lg:block hidden'>
                    <Suggest />
                </div>
            </div>
        </main>
    )
}

export default Home
