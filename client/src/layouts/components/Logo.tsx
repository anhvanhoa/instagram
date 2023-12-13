import classNames from 'classnames'
import { memo } from 'react'
import { Link } from 'react-router-dom'
import images from '~/assets'
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
                    <img src={images.logoIcon} alt='logo' />
                </div>
                <div className='w-[103px] h-[29px] flex-shrink-0 group-[.is-cllapse]:hidden hidden lg:block'>
                    <img src={images.logoText} alt='logo' />
                </div>
            </Link>
        </div>
    )
})

export default Logo
