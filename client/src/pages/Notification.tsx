import ItemNotify from '~/components/ItemNotify'
import HeaderMobile from '~/components/HeaderMobile'
import { useNotification } from '~/hooks/notification.hook'

const Notification = () => {
    const notification = useNotification({ limit: 12 })
    return (
        <div>
            <div>
                <HeaderMobile title='Notification' />
            </div>
            <div className='max-w-xl mx-auto mt-6'>
                <div>
                    {notification.data &&
                        notification.data.map((notification) => (
                            <ItemNotify notify={notification} key={notification._id} />
                        ))}
                </div>
            </div>
        </div>
    )
}

export default Notification
