import { Icon } from '@iconify/react'
import cln from 'classnames'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ExploreItem from '~/components/ExploreItem'
import HeaderMobile from '~/components/HeaderMobile'
import SkeletonExplore from '~/components/SkeletonExplore'
import { useSuggestPosts } from '~/hooks/post.hook'
const Explore = () => {
    const navigate = useNavigate()
    const [limit, setLimit] = useState(1)
    const posts = useSuggestPosts({
        limit,
    })
    const refMain = useRef<HTMLDivElement>(null)
    const countPost = posts.data?.length ?? 0

    const handleScroll = useCallback(() => {
        const heightScroll = Math.ceil(window.scrollY + window.innerHeight)
        const offsetHeight = refMain.current?.offsetHeight ?? 0
        if (heightScroll >= offsetHeight) {
            // limit/page => 12/1
            const limit_page = 12
            setLimit((prev) => {
                if (countPost >= limit_page * prev) return prev + 1
                return prev
            })
        }
    }, [countPost])
    const viewPosts = (link: string) => () =>
        navigate('/p/' + link, {
            preventScrollReset: true,
        })
    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [handleScroll])
    return (
        <main ref={refMain}>
            <HeaderMobile className='md:hidden' title='Explore' />
            <div className='max-w-5xl mx-auto md:p-5 p-2'>
                <div
                    className={cln(
                        'grid grid-cols-2 sm:grid-cols-3 grid-rows-1 gap-1 mb-7',
                    )}
                >
                    {posts.data?.map((element) => (
                        <div
                            key={element._id}
                            onClick={viewPosts(element._id)}
                            className='cursor-pointer'
                        >
                            <ExploreItem post={element} />
                        </div>
                    ))}
                </div>
                {!countPost && <SkeletonExplore />}
            </div>
            {posts.isLoading && (
                <div className='w-7 mx-auto'>
                    <Icon icon='system-uicons:loader' className='text-3xl animate-spin' />
                </div>
            )}
        </main>
    )
}

export default Explore
