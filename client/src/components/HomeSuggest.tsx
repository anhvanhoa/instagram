import SkeletonUser from './SkeletonUser'
import SuggestAccount from './SuggestAccount'
import { useSuggestUser } from '~/hooks/user.hook'

const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const HomeSuggest = () => {
    const suggestUsers = useSuggestUser({
        limit: 20,
    })

    return (
        <div className='mt-6 md:mt-14 mx-auto'>
            {suggestUsers.isLoading &&
                skeletons.map((_, index) => <SkeletonUser key={index} />)}

            {suggestUsers.data &&
                suggestUsers.data.map((user) => (
                    <SuggestAccount key={user._id} user={user} />
                ))}
        </div>
    )
}

export default HomeSuggest
