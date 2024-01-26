import classNames from 'classnames'
import Img from './Img'
import Button from './Button'
import { Notification } from '~/types/chat'
import { useNavigate } from 'react-router-dom'
interface Porps {
    notify: Notification
}
const ItemNotify: React.FC<Porps> = ({ notify }) => {
    const navigate = useNavigate()
    const viewNotify = (link: string) => () => navigate(`/p/${link}`)
    return (
        <div>
            <div
                className={classNames(
                    'flex notifys-center justify-between gap-3 py-2 px-4 my-1',
                    'overflow-hidden hover:bg-gray-50/5 rounded-lg transition-all',
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
                    </div>
                </div>
                <div className='ml-2'>
                    <Button onClick={viewNotify(notify.idPosts)} type='text'>
                        open
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ItemNotify
