import SkeletonUser from './SkeletonUser'

const SkeletonPosts = () => {
    return (
        <div role='status' className='space-y-2 animate-pulse mt-10 mb-10'>
            <SkeletonUser size='small' />
            <div className='flex items-center justify-center w-full aspect-square dark:bg-gray-50/10 bg-gray-100 rounded'></div>
        </div>
    )
}

export default SkeletonPosts
