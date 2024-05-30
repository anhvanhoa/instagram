import { notAvatarServer } from '~/constants/user'
import Img from './Img'
import { Icon } from '@iconify/react/dist/iconify.js'
import { Link } from 'react-router-dom'
import Button from './Button'
import HeaderOption from './HeaderOption'
import { stopPropagation } from '~/utils/helper'

export type PropsAboutAccount = {
    onClose?: () => void
}

const AboutAccount: React.FC<PropsAboutAccount> = ({ onClose }) => {
    return (
        <div onClick={stopPropagation(true)}>
            <HeaderOption isSticky title='About this account' onBack={onClose} />
            <div>
                <div className='pt-4 px-4'>
                    <div className='text-center'>
                        <div className='size-24 mx-auto'>
                            <Img src={notAvatarServer} alt='' isCircle />
                        </div>
                        <p className='mt-2 font-semibold flex justify-center items-center'>
                            <span>John Doe</span>
                            <span>
                                <Icon
                                    className='text-primary ml-1 mt-1'
                                    icon='ph:seal-check-fill'
                                />
                            </span>
                        </p>
                        <div className='px-4 text-xs mt-2'>
                            To help keep our community authentic, we’re showing
                            information about accounts on Instagram.
                            <Link className='pl-1 text-blue-800' to=''>
                                See why this information is important.
                            </Link>
                        </div>
                    </div>
                    <div className='mt-8'>
                        <ul>
                            <li className='flex items-center gap-2 mt-4'>
                                <Icon
                                    className='size-7'
                                    icon='lets-icons:date-range-light'
                                    width='18'
                                    height='18'
                                />
                                <div className='text-sm'>
                                    <p>Date joined</p>
                                    <p className='text-xs text-gray-600'>March 2018</p>
                                </div>
                            </li>
                            <li className='flex items-center gap-2 mt-4'>
                                <Icon
                                    className='size-7'
                                    icon='ic:outline-place'
                                    width='18'
                                    height='18'
                                />
                                <div className='text-sm'>
                                    <p>Account based in</p>
                                    <p className='text-xs text-gray-600'>Vietnam</p>
                                </div>
                            </li>
                            <li className='flex items-center gap-2 mt-4'>
                                <Icon
                                    className='size-7'
                                    icon='mynaui:check-waves'
                                    width='18'
                                    height='18'
                                />
                                <div className='text-sm'>
                                    <p>Verified</p>
                                    <p className='text-xs text-gray-600'>March 2018</p>
                                </div>
                            </li>
                        </ul>
                        <div className='text-xs pt-4 *:mt-4 text-gray-500'>
                            <p>
                                Profiles can be verified by Meta, based on their activity
                                across Meta products or documents they provide. Verified
                                badges are displayed on these profiles.
                            </p>
                            <p>
                                Some verified profiles are owned by a notable person,
                                brand or entity, while others subscribe to Meta Verified.
                                <Link className='ml-1 text-blue-800' to={''}>
                                    Learn more
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
                <div className='mt-5'>
                    <div className='mx-5 mb-5'>
                        <Button className='w-full py-3' type='primary'>
                            Join the waitlist for Meta Verified
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutAccount
