type Props = {
    size?: 'small'
}
const SkeletonUser = ({ size }: Props) => {
    return (
        <div role='status' className='py-2 space-y-4  rounded animate-pulse'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    {size === 'small' && <div className='w-8 h-8 bg-gray-200 rounded-[50%]'></div>}
                    {!size && <div className='w-11 h-11 bg-gray-200 rounded-[50%]'></div>}
                    <div>
                        <div className='h-2.5 bg-gray-200 rounded-full w-24 mb-2.5'></div>
                        <div className='w-32 h-2 bg-gray-200 rounded-full'></div>
                    </div>
                </div>
                <div className='h-2.5 bg-gray-200 rounded-full w-8'></div>
            </div>
        </div>
    )
}

export default SkeletonUser
