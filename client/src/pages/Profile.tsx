import { useNavigate, useParams } from 'react-router-dom'
import { Icon } from '@iconify/react'
import IconApp from '~/assets/icons/IconApp'
import Img from '~/components/Img'
import SkeletonExploreItem from '~/components/SkeletonExploreItem'
import HeaderMobile from '~/components/HeaderMobile'
import Avatar from '~/components/Avatar'
import GroupButtonProfile from '~/components/GroupButtonProfile'
import SkeletonProfile from '~/components/SkeletonProfile'
import Statistical from '~/components/Statistical'
import Information from '~/components/Information'
import OptionProfile from '~/components/OptionProfile'
import { useRemoveFollow } from '~/hooks/follow.hook'
import { useProfile } from '~/hooks/user.hook'
import { usePosts } from '~/hooks/post.hook'

const Profile = () => {
    const navigate = useNavigate()
    const { username } = useParams<{ username: string }>()
    const removeFollower = useRemoveFollow({
        userName: username!,
    })
    const profile = useProfile({
        username: username!,
    })
    const posts = usePosts({
        username: username!,
    })
    const handleRemoverFollower = () => removeFollower.mutate(profile.data.user._id)
    const viewPosts = (link: string) => async () => navigate('/p/' + link)
    return (
        <div>
            <div className='md:hidden'>
                <HeaderMobile
                    title={profile.data.user.userName}
                    contextNext={
                        <OptionProfile
                            viewer={profile.data.user}
                            handleRemoveFollower={handleRemoverFollower}
                            isFollower={profile.data.additional.isFollower}
                            isBlock={profile.data.additional.isBlock}
                        />
                    }
                />
                <div className='mb-2 bg-white flex justify-between px-4'></div>
            </div>
            <div className='max-w-[975px] mx-auto mt-6 md:mt-8 flex flex-col h-screen px-4'>
                {/* Desktop */}
                {!profile.isPending && profile.data.user._id && (
                    <div className='flex items-center mb-2 sm:mb-6'>
                        <div className='mr-5'>
                            <Avatar
                                profile={{
                                    avatar: profile.data.user.avatar,
                                    userName: profile.data.user.userName,
                                }}
                            />
                        </div>
                        <div>
                            <div className='grid grid-cols-1 gap-3'>
                                <div className='hidden xs:flex gap-3 items-center'>
                                    <div className='hidden sm:flex items-center pr-2'>
                                        <h2 className='text-xl font-normal'>
                                            {profile.data.user.userName}
                                        </h2>
                                        <span className='ml-1 mt-0.5'>
                                            {profile.data.user.verify && (
                                                <Icon
                                                    className='text-primary text-lg'
                                                    icon='ph:seal-check-fill'
                                                />
                                            )}
                                        </span>
                                    </div>
                                    <GroupButtonProfile
                                        isFollowing={profile.data.additional.isFollowing}
                                        isFollower={profile.data.additional.isFollower}
                                        isBlock={profile.data.additional.isBlock}
                                        blockByUser={profile.data.additional.blockByUser}
                                        profile={profile.data.user}
                                    />
                                </div>
                                {profile.data.user._id && (
                                    <Statistical profile={profile.data.user} />
                                )}
                            </div>
                            <div className='hidden sm:block'>
                                <Information profile={profile.data.user} />
                            </div>
                        </div>
                    </div>
                )}
                {/* Mobile-bio */}
                <div className='sm:hidden'>
                    <Information profile={profile.data.user} />
                </div>
                {profile.isFetching && <SkeletonProfile />}
                {/* posts */}
                {!profile.data.additional.isBlock &&
                    !profile.data.additional.blockByUser && (
                        <div className='border-t border-second  mt-8 pt-4 md:pt-8 px-1'>
                            <div className='grid grid-cols-3 gap-px sm:gap-1 md:px-8'>
                                {profile.isFetching && (
                                    <>
                                        <SkeletonExploreItem />
                                        <SkeletonExploreItem />
                                        <SkeletonExploreItem />
                                    </>
                                )}
                                {posts.data.map((post, index) => (
                                    <div
                                        key={index}
                                        className='relative group/posts cursor-pointer'
                                        onClick={viewPosts(post._id)}
                                    >
                                        <Img
                                            src={post.media[0].content}
                                            alt={post.title}
                                            className='aspect-square object-cover w-full'
                                        />
                                        {post.media.length > 1 && (
                                            <Icon
                                                className='text-2xl text-white absolute top-1 right-1 md:top-3 md:right-3'
                                                icon='ion:copy'
                                            />
                                        )}
                                        <div className='bg-black/30 absolute inset-0 hidden group-hover/posts:flex justify-center items-center gap-8 text-white'>
                                            <div className='flex items-center gap-1'>
                                                <IconApp type='heart-posts' />
                                                <span>{post.likeTotal}</span>
                                            </div>
                                            <div className='flex items-center gap-1'>
                                                <IconApp type='comment' />
                                                <span>{post.commentTotal}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {!profile.isFetching && !profile.data.user.totalPost && (
                                    <p className='col-span-3 text-center mt-10 text-xl'>
                                        There are no posts
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
            </div>
        </div>
    )
}

export default Profile
