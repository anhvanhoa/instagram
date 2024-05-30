import React from 'react'
import { User } from '~/types/auth'
import BoxListItem from './BoxListItem'
import followersRequest from '~/apis/followersRequest'
import followingRequest from '~/apis/followingRequest'

type Props = {
    profile: User
}

const Statistical: React.FC<Props> = ({ profile }) => (
    <div>
        <div className='flex items-center gap-6 xs:gap-10 ml-0.5 text-base'>
            <p className='text-center flex flex-col xs:flex-row justify-center'>
                <span className='pr-1.5 font-bold'>{profile.totalPost}</span>
                <span>posts</span>
            </p>

            <BoxListItem
                queryKey='followers'
                fnFetch={() => followersRequest(profile.userName)}
                title='Followers'
                userName={profile.userName}
            >
                <p className='text-center flex flex-col xs:flex-row justify-center'>
                    <span className='pr-1.5 font-bold'>{profile.totalFollowers}</span>
                    <span>followers</span>
                </p>
            </BoxListItem>
            <BoxListItem
                title='Following'
                queryKey='following'
                fnFetch={() => followingRequest(profile.userName)}
                userName={profile.userName}
            >
                <p className='text-center flex flex-col xs:flex-row justify-center'>
                    <span className='pr-1.5 font-bold'>{profile.totalFollowing}</span>
                    <span>following</span>
                </p>
            </BoxListItem>
        </div>
    </div>
)

export default Statistical
