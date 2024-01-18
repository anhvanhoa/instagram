import classNames from 'classnames'
import Img from './Img'
import Button from './Button'
import { Notification } from '~/types/chat'
interface Porps {
    notify: Notification
}
const ItemNotify: React.FC<Porps> = ({ notify }) => {
    return (
        <div>
            <div
                className={classNames(
                    'flex notifys-center justify-between gap-3 py-2 px-4 my-1',
                    'overflow-hidden hover:bg-gray-100 rounded-lg transition-all',
                )}
            >
                <div className='flex gap-3'>
                    <Img
                        src={notify.fromUser.avatar}
                        alt=''
                        className='w-10 h-10 object-cover rounded-[50%] flex-shrink-0'
                    />
                    <div className='text-sm text-dot mt-1'>
                        <p className='font-semibold inline-block pr-1'>{notify.fromUser.userName}</p>
                        {notify.content}
                        <p className='font-semibold inline-block pl-1'>{notify.idPosts.title}</p>
                    </div>
                </div>
                <div className='ml-2'>
                    <Button type='text' disable>
                        open
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ItemNotify
