import useContextUser from '~/store/hook'
import AccountItem from './AccountItem'
import { Link } from 'react-router-dom'
import SkeletonUser from './SkeletonUser'
import { useQuery } from '@tanstack/react-query'
import suggestUsers from '~/apis/suggestUsers'
import SuggestAccount from './SuggestAccount'
import { dataFooter } from '~/mock/footer'
import IconApp from '~/assets/icons/IconApp'
import TippyHeadLess from '@tippyjs/react/headless'
import Wrapper from './Wrapper'
import BoxMenu from '~/layouts/components/BoxMenu'

const Suggest = () => {
    const { state: user } = useContextUser()
    // stank
    const { data, isLoading } = useQuery({
        queryKey: ['suggest'],
        queryFn: () => suggestUsers(),
        refetchOnWindowFocus: false,
        enabled: Boolean(user.following.length),
    })
    return (
        <div className='max-w-[300px] mx-8'>
            <div className='sticky top-0 py-4 flex flex-col justify-center border-b border-second'>
                {!user._id && <SkeletonUser />}
                {user._id && (
                    <div className='flex justify-between items-center'>
                        <AccountItem user={user} />
                        <TippyHeadLess
                            trigger='click'
                            interactive
                            delay={[0, 50]}
                            render={() => (
                                <Wrapper>
                                    <BoxMenu />
                                </Wrapper>
                            )}
                        >
                            <div className='hover:dark:bg-second hover:bg-gray-100 cursor-pointer p-2 rounded-md'>
                                <IconApp type='menu-thin' className='w-4 h-4 block' />
                            </div>
                        </TippyHeadLess>
                    </div>
                )}
            </div>
            <div>
                <div className='flex items-center justify-between mt-3.5'>
                    {!!data?.length && <span className='text-sm font-medium'>Suggested for you</span>}
                </div>
                <div className='py-2'>
                    {isLoading && (
                        <>
                            <SkeletonUser />
                            <SkeletonUser />
                            <SkeletonUser />
                        </>
                    )}
                    {data?.map((element) => <SuggestAccount key={element._id} userP={element} />)}
                </div>
            </div>
            <div className='mt-3 pb-9'>
                <div className='mb-2'>
                    <ul className={'flex items-center gap-x-3 mb-1 flex-wrap'}>
                        {dataFooter.map((element) => {
                            return element.to ? (
                                <li key={element.id}>
                                    <Link to={element.to} className='text-xs text-gray-400'>
                                        {element.title}
                                    </Link>
                                </li>
                            ) : (
                                <li key={element.id}>
                                    <div className={'text-xs text-gray-400'}>{element.title}</div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <p className='text-xs text-gray-400'>© 2023 INSTAGRAM FROM META</p>
            </div>
        </div>
    )
}

export default Suggest
