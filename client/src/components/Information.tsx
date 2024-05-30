import { Icon } from '@iconify/react/dist/iconify.js'
import { User } from '~/types/auth'
import { convertBioToHtml } from '~/utils/helper'

type Props = {
    profile: User
}
const Information: React.FC<Props> = ({ profile }) => {
    return (
        <div>
            <div className='text-sm mt-1 sm:mt-4'>
                <p className='font-semibold'>{profile.fullName}</p>
                <div className='leading-4'>
                    <div
                        className='mt-1.5'
                        dangerouslySetInnerHTML={{
                            __html: convertBioToHtml(profile.bio),
                        }}
                    ></div>
                    <a
                        href={profile.website}
                        className='mt-1 flex items-center text-blue-900'
                    >
                        {profile.website && (
                            <Icon icon='tabler:link' className='mr-1 size-4' />
                        )}
                        <span className='font-medium'>{profile.website}</span>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Information
