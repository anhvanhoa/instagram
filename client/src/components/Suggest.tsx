import useContextUser from '~/store/hook'
import AccountItem from './AccountItem'
import { Link } from 'react-router-dom'
import SkeletonUser from './SkeletonUser'
import { useQuery } from '@tanstack/react-query'
import suggestUsers from '~/apis/suggestUsers'
import SuggestAccount from './SuggestAccount'
import { dataFooter } from '~/mock/footer'

const Suggest = () => {
    const { state: user } = useContextUser()
    // stank
    const { data, isLoading } = useQuery({
        queryKey: ['suggest'],
        queryFn: () => suggestUsers(),
        refetchOnWindowFocus: false,
        enabled: Boolean(user.following.length),
    })
    return (
        <div className='pt-8 max-w-[300px]'>
            <div className='mt-4 mb-3 h-16 flex flex-col justify-center'>
                {!user._id && <SkeletonUser />}
                {user._id && <AccountItem size='big' user={user} />}
            </div>
            <div>
                <div className='flex items-center justify-between'>
                    <span className='text-sm text-gray-500 font-semibold'>Suggested for you</span>
                    <Link to='/' className='text-xs font-semibold'>
                        See all
                    </Link>
                </div>
                <div className='py-2'>
                    {isLoading && (
                        <>
                            <SkeletonUser />
                            <SkeletonUser />
                            <SkeletonUser />
                        </>
                    )}
                    {data?.map((element) => (
                        <div key={element._id}>
                            <SuggestAccount userP={element} />
                        </div>
                    ))}
                </div>
            </div>
            <div className='mt-3 pb-9'>
                <div className='mb-4'>
                    <ul className={'flex items-center gap-x-3 mb-1 flex-wrap'}>
                        {dataFooter.map((element) => {
                            return element.to ? (
                                <li key={element.id}>
                                    <Link to={element.to} className='text-xs text-[#c7c7c7]'>
                                        {element.title}
                                    </Link>
                                </li>
                            ) : (
                                <li key={element.id}>
                                    <div className={'text-xs text-[#c7c7c7]'}>{element.title}</div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <p className='text-xs text-[#c7c7c7]'>© 2023 INSTAGRAM FROM META</p>
            </div>
        </div>
    )
}

export default Suggest
