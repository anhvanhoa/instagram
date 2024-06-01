import AccountItem from './AccountItem'
import { Link } from 'react-router-dom'
import SkeletonUser from './SkeletonUser'
import SuggestAccount from './SuggestAccount'
import { dataFooter } from '~/mock/footer'
import useAuth from '~/hooks/useAuth'
import { useSuggestUser } from '~/hooks/user.hook'
import Button from './Button'

const Suggest = () => {
    const { user } = useAuth()
    const usersSuggest = useSuggestUser({
        limit: user.totalFollowing && 9,
    })
    return (
        <div className='max-w-[300px] mx-8'>
            <div className='py-4 pb-6 flex flex-col justify-center border-b border-second'>
                <div className='flex justify-between items-center'>
                    <AccountItem user={user} />
                    <Button className='text-xs' type='text'>
                        Switch
                    </Button>
                </div>
            </div>
            <div>
                <div className='flex items-center justify-between mt-3.5'>
                    {Boolean(usersSuggest.data.length) && (
                        <span className='text-sm font-medium'>Suggested for you</span>
                    )}
                </div>
                <div className='py-2'>
                    {usersSuggest.isLoading && (
                        <>
                            <SkeletonUser />
                            <SkeletonUser />
                            <SkeletonUser />
                        </>
                    )}
                    {usersSuggest.data.map((user) => (
                        <SuggestAccount type='text' key={user._id} user={user} />
                    ))}
                </div>
            </div>
            <div className='mt-3 pb-9'>
                <div className='mb-2'>
                    <ul className={'flex items-center gap-x-3 mb-1 flex-wrap'}>
                        {dataFooter.map((element) => {
                            return element.to ? (
                                <li key={element.id}>
                                    <Link
                                        to={element.to}
                                        className='text-xs text-gray-400'
                                    >
                                        {element.title}
                                    </Link>
                                </li>
                            ) : (
                                <li key={element.id}>
                                    <div className={'text-xs text-gray-400'}>
                                        {element.title}
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <p className='text-xs text-gray-400'>© 2023 INSTAGRAM FROM META</p>
            </div>
        </div>
    )
}

export default Suggest
