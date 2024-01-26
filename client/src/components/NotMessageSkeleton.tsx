const NotMessageSkeleton = () => {
    return (
        <div className='flex justify-center flex-col items-center text-center h-full gap-y-3'>
            <div role='status' className='py-2 space-y-4 rounded animate-pulse'>
                <div className='flex flex-col items-center'>
                    <div className='w-32 h-32 dark:bg-gray-50/5 bg-gray-100 rounded-[50%] mb-6'></div>
                    <div className='flex flex-col items-center'>
                        <div className='h-6 dark:bg-gray-50/5 bg-gray-100 rounded-full w-60 mb-4'></div>
                        <div className='h-2.5 dark:bg-gray-50/5 bg-gray-100 rounded-full w-96 mb-4'></div>
                        <div className='h-6 dark:bg-gray-50/5 bg-gray-100 rounded-full w-40 mb-4'></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotMessageSkeleton
