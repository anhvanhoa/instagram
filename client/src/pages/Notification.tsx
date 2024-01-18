import { Icon } from '@iconify/react/dist/iconify.js'
import { useQuery } from '@tanstack/react-query'
import getNotification from '~/apis/getNotification'
import ItemNotify from '~/components/ItemNotify'
import { useNavigate } from 'react-router-dom'

const Notification = () => {
    const navifate = useNavigate()
    const handleBack = () => navifate(-1)
    const { data } = useQuery({
        queryKey: ['notification'],
        queryFn: () => getNotification(),
    })
    return (
        <div>
            <div>
                <div className='flex justify-between items-center px-4 py-3 border-b'>
                    <div onClick={handleBack}>
                        <Icon
                            icon='formkit:left'
                            className='text-2xl px-2 py-px cursor-pointer hover:bg-gray-100 hover:scale-110 transition-all rounded-lg'
                        />
                    </div>
                    <div>
                        <p className='font-semibold'>Notification</p>
                    </div>
                    <div></div>
                </div>
            </div>
            <div className='max-w-xl mx-auto mt-6'>
                <div>{data && data.map((item) => <ItemNotify notify={item} key={item._id} />)}</div>
            </div>
        </div>
    )
}

export default Notification
