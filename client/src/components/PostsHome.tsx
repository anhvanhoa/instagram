import { Icon } from '@iconify/react/dist/iconify.js'
import SkeletonPosts from './SkeletonPosts'
import EndPosts from './EndPosts'
import Posts from './Posts'
import { useQuery } from '@tanstack/react-query'
import getPosts from '~/apis/posts'
const PostsHome = () => {
    const postsFollow = useQuery({
        queryKey: ['posts'],
        queryFn: () => getPosts(),
        refetchOnWindowFocus: false,
        refetchOnMount: 'always',
    })
    return (
        <div>
            <div className='p-2 hidden'>
                <Icon className='mx-auto text-3xl text-gray-500 animate-spin' icon='lucide:loader' />
            </div>
            <div className='mx-auto xs:max-w-[470px]'>
                {postsFollow.isLoading && (
                    <>
                        <SkeletonPosts />
                        <SkeletonPosts />
                        <SkeletonPosts />
                    </>
                )}
                {postsFollow.data &&
                    postsFollow.data.map((element) => (
                        <Posts key={element._id} posts={element} author={element.author} />
                    ))}
                <EndPosts />
            </div>
            <div className='mb-14'></div>
        </div>
    )
}

export default PostsHome
