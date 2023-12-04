import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'
const dataFooter = [
    {
        id: 1,
        title: 'Meta',
        to: '/meta'
    },
    {
        id: 2,
        title: 'Giới thiệu',
        to: '/introduce'
    },
    {
        id: 3,
        title: 'blog',
        to: '/blog'
    },
    {
        id: 4,
        title: 'Việc làm',
        to: '/work'
    },
    {
        id: 5,
        title: 'Trợ giúp',
        to: '/help'
    },
    {
        id: 6,
        title: 'API',
        to: '/api'
    },
    {
        id: 7,
        title: 'Quyền riêng tư',
        to: '/privacy'
    },
    {
        id: 8,
        title: 'Điều khoản',
        to: '/rules'
    },
    {
        id: 9,
        title: 'Tài khoản liên quan nhất',
        to: '/the-most-relevant-account'
    },
    {
        id: 10,
        title: 'Vị trí',
        to: '/Location'
    },
    {
        id: 11,
        title: 'Instagram Lite',
        to: '/web/lite'
    },
    {
        id: 12,
        title: 'Tải thông tin người liên hệ lên & người không phải người dùng',
        to: '/help/id'
    },
    {
        id: 13,
        title: 'Meta đã xác minh',
        to: '/mate/verify'
    }
]
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
            <div className='px-4 mb-16'>
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
