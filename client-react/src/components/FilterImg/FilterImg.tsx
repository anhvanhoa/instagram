import { useState, memo } from 'react';
import images from '~/assets/images';
const listFilter = [
    {
        title: 'Normal',
        image: images.filers.normal,
    },
    {
        title: 'Aden',
        image: images.filers.aden,
    },
    {
        title: 'Clarendon',
        image: images.filers.clarendon,
    },
    {
        title: 'Crema',
        image: images.filers.crema,
    },
    {
        title: 'Moon',
        image: images.filers.moon,
    },
    {
        title: 'Slumber',
        image: images.filers.slumber,
    },
];

type TypeEdit = 'filter' | 'crop';
const FilterImg = () => {
    const [typeEdit, setTypeEdit] = useState<TypeEdit>('filter');
    return (
        <div className="w-[340px]">
            <div className="flex items-center text-center">
                <p
                    className={`flex-1 p-3 border-b border-[#ccc] border-solid cursor-pointer ${
                        typeEdit === 'filter' ? 'font-semibold' : 'text-second'
                    }`}
                    onClick={() => setTypeEdit('filter')}
                >
                    Bộ lọc
                </p>
                <p
                    className={`flex-1 p-3 border-b border-[#ccc] border-solid cursor-pointer ${
                        typeEdit === 'crop' ? 'font-semibold' : 'text-second'
                    }`}
                    onClick={() => setTypeEdit('crop')}
                >
                    Điều Chỉnh
                </p>
            </div>
            {/* <p className="text-center py-4">Đang phát triển</p> */}
            <div className="grid grid-cols-3 gap-4 p-5">
                {typeEdit === 'filter' && (
                    <>
                        {listFilter.map((element, index) => (
                            <div key={index} className="flex flex-col justify-center items-center">
                                <img
                                    src={element.image}
                                    alt={element.title}
                                    title={element.title}
                                    className="rounded-md"
                                />
                                <p className="text-xs py-2 text-second">{element.title}</p>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default memo(FilterImg);
