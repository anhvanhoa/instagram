import { useQuery } from '@tanstack/react-query'
import suggestUsers from '~/apis/suggestUsers'
import SkeletonUser from './SkeletonUser'
import SuggestAccount from './SuggestAccount'

const HomeSuggest = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['suggest-home'],
        queryFn: () => suggestUsers(20),
    })

    return (
        <div className='mt-6 md:mt-14 mx-auto'>
            {isLoading && (
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
            {data && data.map((user) => <SuggestAccount key={user._id} user={user} />)}
        </div>
    )
}

export default HomeSuggest
