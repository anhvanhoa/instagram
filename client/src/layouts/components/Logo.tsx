import classNames from 'classnames'
import { memo } from 'react'
import { Link } from 'react-router-dom'
import IconApp from '~/assets/icons/IconApp'
interface Props {
    handleId: (id: number) => () => void
}
const Logo: React.FC<Props> = memo(({ handleId }) => {
    return (
        <div className='h-[73px] px-3 pt-7 pb-4 mb-5' title='instagram-clone'>
            <Link to='/' className={'relative flex'} onClick={handleId(1)}>
                <div
                    className={classNames(
                        'w-6 h-6 flex-shrink-0 absolute left-0 top-0 scale-100 group-[.is-cllapse]:visible',
                        'group-[.is-cllapse]:scale-100 transition-all visible lg:scale-50 lg:invisible',
                    )}
                >
                    <IconApp type='logo-icon' className='dark:fill-white' />
                </div>
                <div className='flex-shrink-0 group-[.is-cllapse]:hidden hidden lg:block'>
                    <IconApp type='logo-text' className='w-[103px] h-[29px]' />
                </div>
            </Link>
        </div>
    )
})

export default Logo
