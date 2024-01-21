const AccountChatSkeleton = () => {
    const data = [1, 1, 1, 1, 1, 1, 1, 1, 1]
    return (
        <div className='flex flex-col lg:px-10 mt-6 text-center h-full gap-y-3'>
            <div role='status' className='py-2 space-y-4 rounded animate-pulse'>
                <div className=''>
                    {data.map((_, i) => (
                        <div key={i} className='flex items-center gap-6 mb-4 xs:flex-col lg:flex-row px-6 xs:px-0'>
                            <div className='w-12 h-12 lg:w-14 lg:h-14 bg-gray-200 rounded-[50%]'></div>
                            <div className='xs:hidden lg:block flex-1'>
                                <div className='w-9/12 h-2.5 bg-gray-200 rounded-full lg:w-40 mb-2.5'></div>
                                <div className='lg:w-48 h-2.5 bg-gray-200 rounded-full'></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AccountChatSkeleton
