import { Icon } from '@iconify/react'
import { useQuery } from '@tanstack/react-query'
import cln from 'classnames'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import suggestsPosts from '~/apis/suggestsPosts'
import ExploreItem from '~/components/ExploreItem'
import SkeletonExploreItem from '~/components/SkeletonExploreItem'

const Explore = () => {
    const navigate = useNavigate()
    const [limit, setLimit] = useState(12)
    const { data, isLoading } = useQuery({
        queryKey: ['suggest-posts', limit],
        queryFn: () => suggestsPosts(limit),
    })
    const handleScroll = useCallback(() => {
        const heightScroll = window.scrollY + window.innerHeight
        const offsetHeight = window.document.body.offsetHeight
        if (heightScroll > offsetHeight) setLimit((prev) => prev + 12)
    }, [])
    const viewPosts = (link: string) => () =>
        navigate('/p/' + link, {
            preventScrollReset: true,
        })
    useEffect(() => {
        window.document.addEventListener('scroll', handleScroll)
        return () => window.document.removeEventListener('scroll', handleScroll)
    }, [handleScroll])
    return (
        <main>
            <div className='max-w-[975px] mx-auto pt-6 px-5'>
                <div className={cln('grid grid-cols-3 grid-rows-1 gap-1 mb-7')}>
                    {isLoading && (
                        <>
                            <SkeletonExploreItem />
                            <SkeletonExploreItem />
                            <SkeletonExploreItem />
                            <SkeletonExploreItem />
                            <SkeletonExploreItem />
                            <SkeletonExploreItem />
                        </>
                    )}
                    {data &&
                        data.map((element) => (
                            <div onClick={viewPosts(element._id)} className='cursor-pointer'>
                                <ExploreItem key={element._id} posts={element} />
                            </div>
                        ))}
                </div>
            </div>
            {isLoading && (
                <div className='w-[975px] mx-auto flex justify-center'>
                    <div>
                        <Icon icon='system-uicons:loader' className='text-3xl animate-spin' />
                    </div>
                </div>
            )}
        </main>
    )
}

export default Explore
