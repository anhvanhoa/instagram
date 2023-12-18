import { Icon } from '@iconify/react'
import classNames from 'classnames'
import StoryItem from '~/components/StoryItem'

const Home = () => {
    return (
        <main className='flex-1'>
            <div className={classNames('flex', 'justify-center', 'mx-auto', 'pt-1')}>
                <div className={classNames('mr-8', 'max-w-[630px]', 'w-full')}>
                    <div className='p-2'>
                        <Icon className='mx-auto text-3xl text-gray-500 animate-spin hidden' icon='lucide:loader' />
                    </div>
                    <div className={classNames('mt-4', 'py-4', 'bg-white', 'rounded-md')}>
                        <div className={classNames('flex', 'gap-x-4')}>
                            <StoryItem
                                avatar='https://anhvanhoa.com/image/avatar.jpg'
                                userName='Tin của bạn'
                                isStory={false}
                                to='/story/anhvhoa'
                            />
                        </div>
                    </div>
                    <div className='w-[470px] mx-auto'>
                        {/* <ListPosts /> */}
                        <div>{/* <EndPosts /> */}</div>
                        <div>
                            <h4 className='mt-3 text-xl'>Bài viết gợi ý</h4>
                        </div>
                        <div>{/* <Posts /> */}</div>
                    </div>
                </div>
                <div className='pl-16'>{/* <Suggest /> */}</div>
            </div>
        </main>
    )
}

export default Home
