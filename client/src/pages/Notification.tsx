import { useQuery } from '@tanstack/react-query'
import getNotification from '~/apis/getNotification'
import ItemNotify from '~/components/ItemNotify'
import HeaderMobile from '~/components/HeaderMobile'

const Notification = () => {
    const { data } = useQuery({
        queryKey: ['notification'],
        queryFn: () => getNotification(),
    })
    return (
        <div>
            <div>
                <HeaderMobile title='Notification' />
            </div>
            <div className='max-w-xl mx-auto mt-6'>
                <div>{data && data.map((item) => <ItemNotify notify={item} key={item._id} />)}</div>
            </div>
        </div>
    )
}

export default Notification
