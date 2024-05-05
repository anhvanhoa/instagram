import { useQuery } from '@tanstack/react-query'
import suggestUsersRequest from '~/apis/suggestUsersRequest'
import SkeletonUser from './SkeletonUser'
import SuggestAccount from './SuggestAccount'

const HomeSuggest = () => {
    const suggestUsers = useQuery({
        queryKey: ['suggest-home'],
        queryFn: () => suggestUsersRequest(20),
    })

    return (
        <div className='mt-6 md:mt-14 mx-auto'>
            {suggestUsers.isLoading && (
                <div>
                    <SkeletonUser />
                    <SkeletonUser />
                    <SkeletonUser />
                    <SkeletonUser />
                    <SkeletonUser />
                    <SkeletonUser />
                    <SkeletonUser />
                </div>
            )}
            {suggestUsers.data && suggestUsers.data.map((user) => <SuggestAccount key={user._id} user={user} />)}
        </div>
    )
}

export default HomeSuggest
