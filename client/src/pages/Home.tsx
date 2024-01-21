import classNames from 'classnames'
import HeaderHomeMobile from '~/components/HeaderHomeMobile'
import HomeSuggest from '~/components/HomeSuggest'
import PostsHome from '~/components/PostsHome'
import Suggest from '~/components/Suggest'
import useContextUser from '~/store/hook'
const Home = () => {
    const { state } = useContextUser()
    return (
        <main className='flex-1 md:mx-8'>
            <HeaderHomeMobile />
            <div className={classNames('flex', 'justify-center', 'mx-auto', 'pt-1')}>
                <div className={classNames('px-2 xs:px-4 sm:px-8 max-w-full xs:max-w-[630px] w-full')}>
                    {state.following.length === 0 && <HomeSuggest />}
                    {state.following.length !== 0 && <PostsHome />}
                </div>
                <div className='pl-10 xl:block hidden'>
                    <Suggest />
                </div>
            </div>
        </main>
    )
}

export default Home
