import { memo } from 'react'
import images from '~/assets'
const listFilter = [
    {
        title: 'Normal',
        image: images.normal,
    },
    {
        title: 'Aden',
        image: images.aden,
    },
    {
        title: 'Clarendon',
        image: images.clarendon,
    },
    {
        title: 'Crema',
        image: images.crema,
    },
    {
        title: 'Moon',
        image: images.moon,
    },
    {
        title: 'Slumber',
        image: images.slumber,
    },
]

const FilterImg = memo(() => {
    return (
        <div className='w-[340px] border-l'>
            <div className='flex items-center text-center'>
                <p className={`flex-1 p-3 border-b border-[#ccc] border-solid cursor-pointer`}>Filters</p>
            </div>
            <div className='grid grid-cols-3 gap-4 p-5'>
                {listFilter.map((element, index) => (
                    <div key={index} className='flex flex-col justify-center items-center'>
                        <img src={element.image} alt={element.title} title={element.title} className='rounded-md' />
                        <p className='text-xs py-2 text-gray-500'>{element.title}</p>
                    </div>
                ))}
            </div>
        </div>
    )
})

export default FilterImg
