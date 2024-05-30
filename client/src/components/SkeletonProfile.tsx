import SkeleteBio from './SkeletonBio'

const SkeletonProfile = () => {
    return (
        <div>
            <div className='flex items-center mb-4 sm:mb-11'>
                <div className='sm:px-8 md:px-10 py-2'>
                    <div className='size-24 sm:size-40 bg-gray-100 dark:bg-gray-50/10 rounded-full'></div>
                </div>
                <div className='px-5'>
                    <div className='flex-col flex sm:flex-row gap-4 sm:gap-10 items-start sm:items-center'>
                        <p className='hidden sm:block w-20 h-3 bg-gray-100 dark:bg-gray-50/10 rounded-xl'></p>
                        <div className='flex items-center gap-2'>
                            <p className='w-20 h-7 bg-gray-100 dark:bg-gray-50/10 rounded-xl'></p>
                            <p className='hidden sm:block w-24 h-7 bg-gray-100 dark:bg-gray-50/10 rounded-xl'></p>
                            <p className='hidden sm:block size-7 bg-gray-100 dark:bg-gray-50/10 rounded-xl'></p>
                        </div>
                    </div>
                    <div>
                        <div className='flex items-center mb-3 my-4'>
                            <p className='mr-10 w-14 h-3 bg-gray-100 dark:bg-gray-50/10 rounded-xl'></p>
                            <p className='mr-10 w-14 h-3 bg-gray-100 dark:bg-gray-50/10 rounded-xl'></p>
                            <p className='mr-10 w-14 h-3 bg-gray-100 dark:bg-gray-50/10 rounded-xl'></p>
                        </div>
                    </div>
                    <div className='sm:block hidden'>
                        <SkeleteBio />
                    </div>
                </div>
            </div>
            <div className='sm:hidden'>
                <SkeleteBio />
            </div>
        </div>
    )
}

export default SkeletonProfile
