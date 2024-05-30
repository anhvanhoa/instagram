import SkeletonPosts from './SkeletonPosts'
import EndPosts from './EndPosts'
import Posts from './Post'
import { useQuery } from '@tanstack/react-query'
import getPosts from '~/apis/posts'

const skeletons = [1, 2, 3, 4]
const PostsHome = () => {
    const postsFollow = useQuery({
        queryKey: ['posts'],
        queryFn: () => getPosts(),
        refetchOnWindowFocus: false,
    })
    return (
        <div>
            <div className='mx-auto xs:max-w-[470px]'>
                {postsFollow.isLoading &&
                    skeletons.map((_, index) => <SkeletonPosts key={index} />)}
                {postsFollow.data &&
                    postsFollow.data.map((element) => (
                        <Posts key={element._id} posts={element} />
                    ))}
                <EndPosts />
            </div>
            <div className='mb-14'></div>
        </div>
    )
}

export default PostsHome
