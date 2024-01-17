import { Icon } from '@iconify/react/dist/iconify.js'
import classNames from 'classnames'
import StoryItem from './StoryItem'
import SkeletonPosts from './SkeletonPosts'
import EndPosts from './EndPosts'
import Posts from './Posts'
import { useQuery } from '@tanstack/react-query'
import getPosts from '~/apis/posts'

const PostsHome = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['posts'],
        queryFn: () => getPosts(),
        refetchOnWindowFocus: false,
        refetchOnMount: 'always',
    })
    return (
        <div>
            <div className='p-2'>
                <Icon className='mx-auto text-3xl text-gray-500 animate-spin hidden' icon='lucide:loader' />
            </div>
            <div className={classNames('mt-4 py-4 bg-white rounded-md hidden')}>
                <div className={classNames('flex gap-x-4')}>
                    <StoryItem
                        avatar='https://anhvanhoa.com/image/avatar.jpg'
                        userName='Tin của bạn'
                        isStory={false}
                        to='/story/anhvhoa'
                    />
                </div>
            </div>
            <div className='mx-auto xs:max-w-[470px]'>
                {isLoading && (
                    <>
                        <SkeletonPosts />
                        <SkeletonPosts />
                        <SkeletonPosts />
                    </>
                )}
                {data && data.map((element) => <Posts key={element._id} posts={element} user={element.author} />)}
                <EndPosts />
            </div>
        </div>
    )
}

export default PostsHome
