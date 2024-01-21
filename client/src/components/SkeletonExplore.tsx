import SkeletonExploreItem from './SkeletonExploreItem'

const SkeletonExplore = () => {
    return (
        <div>
            <div className={'grid grid-cols-2 sm:grid-cols-3 grid-rows-1 gap-1 mb-7'}>
                <SkeletonExploreItem />
                <SkeletonExploreItem />
                <SkeletonExploreItem />
                <SkeletonExploreItem />
                <SkeletonExploreItem />
                <SkeletonExploreItem />
            </div>
        </div>
    )
}

export default SkeletonExplore
