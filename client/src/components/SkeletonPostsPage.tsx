import SkeletonUser from './SkeletonUser'

const SkeletonPostsPage = () => {
    return (
        <div>
            <div className='mt-6 md:flex flex-row'>
                <div className='flex items-center justify-center md:h-[400px] lg:h-[460px] xl:h-[550px] aspect-square bg-gray-300 rounded animate-pulse'>
                    <svg
                        className='w-10 h-10 text-gray-200'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='currentColor'
                        viewBox='0 0 20 18'
                    >
                        <path d='M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z' />
                    </svg>
                </div>
                <div className='w-80 xs:w-[450px] sm:w-[500px] md:w-52 lg:w-60 xl:w-96 border relative overflow-y-auto flex flex-col rounded-ee-lg rounded-se-lg'>
                    <div className='sticky top-0 bg-white'>
                        <div className='px-4 py-3 border-b'>
                            <SkeletonUser />
                        </div>
                    </div>
                    <div className='pb-4 px-4 mt-6 flex-1'>
                        <SkeletonUser />
                        <SkeletonUser />
                        <div className='hidden lg:block'>
                            <SkeletonUser />
                        </div>
                        <div className='hidden xl:block'>
                            <SkeletonUser />
                        </div>
                    </div>
                    <div className='sticky bottom-0 bg-white pt-4 border-t shadow-lg'>
                        <div className='px-4'>
                            <div className='h-9 bg-gray-200 rounded-3xl w-full mb-2'></div>
                        </div>
                        <div className='px-5'>
                            <div className='h-2.5 bg-gray-200 rounded-3xl w-20 mb-4'></div>
                        </div>
                        <div className='border-t px-4 py-2'>
                            <div className='h-10 bg-gray-200 rounded-md w-full'></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SkeletonPostsPage
