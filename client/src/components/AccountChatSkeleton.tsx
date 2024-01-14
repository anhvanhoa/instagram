const AccountChatSkeleton = () => {
    const data = [1, 1, 1, 1, 1, 1, 1, 1, 1]
    return (
        <div className='flex flex-col px-10 mt-10 text-center h-full gap-y-3'>
            <div role='status' className='py-2 space-y-4  rounded animate-pulse'>
                <div className=''>
                    {data.map((_, i) => (
                        <div key={i} className='flex items-center gap-6 mb-4'>
                            <div className='w-14 h-14 bg-gray-200 rounded-[50%]'></div>
                            <div>
                                <div className='h-2.5 bg-gray-200 rounded-full w-40 mb-2.5'></div>
                                <div className='w-48 h-2 bg-gray-200 rounded-full'></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AccountChatSkeleton
