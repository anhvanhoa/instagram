import { Icon } from '@iconify/react'
import { useQuery } from '@tanstack/react-query'
import cln from 'classnames'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import suggestsPosts from '~/apis/suggestsPosts'
import ExploreItem from '~/components/ExploreItem'
import HeaderMobile from '~/components/HeaderMobile'
import SkeletonExplore from '~/components/SkeletonExplore'

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
            <HeaderMobile className='md:hidden' title='Explore' />
            <div className='max-w-[975px] mx-auto md:pt-6 p-2 md:px-5'>
                {isLoading && <SkeletonExplore />}
                <div className={cln('grid grid-cols-2 sm:grid-cols-3 grid-rows-1 gap-1 mb-7')}>
                    {data &&
                        data.map((element) => (
                            <div key={element._id} onClick={viewPosts(element._id)} className='cursor-pointer'>
                                <ExploreItem posts={element} />
                            </div>
                        ))}
                </div>
                {isLoading && (
                    <div className='w-7 mx-auto'>
                        <Icon icon='system-uicons:loader' className='text-3xl animate-spin' />
                    </div>
                )}
            </div>
        </main>
    )
}

export default Explore
