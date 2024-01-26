import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'
import { dataFooter } from '~/mock/footer'
function Footer() {
    const renderItems = dataFooter.map((element) => (
        <p key={element.id} className='mx-2 mb-3 h-3'>
            <Link className='text-xs text-[#737373]' to={element.to}>
                <span>{element.title}</span>
            </Link>
        </p>
    ))
    return (
        <footer>
            <div className='px-4 pb-8'>
                <div className='flex justify-center items-center mt-6 '>
                    <div className='flex justify-center items-center flex-wrap'>{renderItems}</div>
                </div>
                <div className='my-3 flex items-center justify-center text-xs text-[#737373]'>
                    <div className='flex items-center leading-3'>
                        <span>Tiếng Việt</span>
                        <Icon className='text-[8px]' icon='formkit:down' />
                    </div>
                    <div className='flex items-center leading-3 ml-3'>
                        <Icon icon='icons8:copyright' />
                        <span>2023 Instagram from Meta</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
