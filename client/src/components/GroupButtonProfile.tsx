import { Link } from 'react-router-dom'
import Button from './Button'
import useAuth from '~/hooks/useAuth'
import AlertUnfollow from './AlertUnfollow'
import { UserBase } from '~/types/auth'
import OptionProfile from './OptionProfile'
import { useFollow, useRemoveFollow } from '~/hooks/follow.hook'
import { useRoom } from '~/hooks/message.hook'
import { useUnblock } from '~/hooks/user.hook'
interface Props {
    profile: UserBase
    isFollowing: boolean
    isFollower: boolean
    isBlock: boolean
    blockByUser: boolean
}
const GroupButtonProfile = ({
    isFollowing,
    profile,
    isFollower,
    isBlock,
    blockByUser,
}: Props) => {
    const { user } = useAuth()
    const follow = useFollow({ userName: profile.userName })
    const unblock = useUnblock({
        username: profile.userName,
    })
    const removeFollower = useRemoveFollow({ userName: profile.userName })
    const room = useRoom({
        userName: profile.userName,
    })
    const handleUnblock = () => unblock.mutate(profile._id)
    const handleFollow = () => follow.mutate(profile._id)
    const handleRemoverFollower = () => removeFollower.mutate(profile._id)
    const handleRoom = () => room.mutate(profile._id)
    return (
        <div className='hidden xs:block'>
            <div className='flex gap-3'>
                {isBlock || blockByUser ? (
                    <>
                        {isBlock && (
                            <Button onClick={handleUnblock} size='small'>
                                Unblock
                            </Button>
                        )}
                        {blockByUser && (
                            <Button disable size='small' type='second'>
                                Blocked
                            </Button>
                        )}
                    </>
                ) : (
                    <>
                        {profile.userName === user.userName && (
                            <Link to='/accounts/edit'>
                                <Button size='small' type='second'>
                                    Edit profile
                                </Button>
                            </Link>
                        )}
                        <Button
                            isHidden={isFollowing || profile.userName === user.userName}
                            onClick={handleFollow}
                            size='small'
                        >
                            Follow
                        </Button>
                        {!isFollowing ||
                            (profile.userName !== user.userName && (
                                <AlertUnfollow user={profile}>
                                    <Button size='small' type='second'>
                                        Following
                                    </Button>
                                </AlertUnfollow>
                            ))}
                    </>
                )}
                {!blockByUser && (
                    <Button
                        isHidden={profile.userName === user.userName}
                        onClick={handleRoom}
                        type='second'
                        size='small'
                    >
                        Message
                    </Button>
                )}
                <div className='md:block hidden'>
                    <OptionProfile
                        viewer={profile}
                        handleRemoveFollower={handleRemoverFollower}
                        isFollower={isFollower}
                        isBlock={isBlock}
                    />
                </div>
            </div>
        </div>
    )
}

export default GroupButtonProfile
