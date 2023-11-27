import { useEffect, useState, memo } from 'react';
import { TypeImgCrop } from '~/types/posts';
import SliderPosts from '../SliderPosts';
import getSize from '~/utils/getSize';
import HeadCreatePosts from '~/components/HeadCreatePosts';
import FilterImg from '~/components/FilterImg';
interface Props {
    listImage: TypeImgCrop[];
    onStep: (value: React.SetStateAction<number>) => void;
}
const EditImg = ({ listImage, onStep }: Props) => {
    const [indexSlide, setIndexSlide] = useState(0);
    const [sizeCrop, setSizeCrop] = useState({ height: 520, width: 520 });
    useEffect(() => {
        let width = 520;
        let height = 520;
        const aspect = listImage[indexSlide].aspect;
        switch (aspect) {
            case '4/5':
                width *= 0.8;
                setSizeCrop({ height, width });
                break;
            case '16/9':
                height *= 0.5625;
                setSizeCrop({ height, width });
                break;
            case 'origin':
                getSize(listImage[indexSlide].fileCrop, (widthImg, heightImg) => {
                    if (heightImg > widthImg) {
                        let ratio = heightImg / widthImg;
                        width = height / ratio;
                        setSizeCrop({ height, width });
                    } else {
                        let ratio = widthImg / heightImg;
                        height = width / ratio;
                        setSizeCrop({ height, width });
                    }
                });
                break;
            default:
                setSizeCrop({ height, width });
                break;
        }
    }, [indexSlide, listImage]);
    const handlePrev = () => onStep(2);
    const handleNext = () => onStep(4);
    return (
        <div>
            <HeadCreatePosts onPrev={handlePrev} onNext={handleNext} title="Chỉnh sửa" />
            <div className="flex">
                <div className="w-[520px] h-[520px] bg-black/50 relative flex justify-center items-center">
                    <SliderPosts
                        getIndexImg={(i) => setIndexSlide(i)}
                        listImage={listImage}
                        propsAvatarEditor={{
                            height: sizeCrop.height,
                            width: sizeCrop.width,
                            style: { cursor: 'pointer' },
                            border: 0,
                            position: { x: listImage[indexSlide].clientSize.x, y: listImage[indexSlide].clientSize.y },
                        }}
                    />
                </div>
                <FilterImg />
            </div>
        </div>
    );
};

export default memo(EditImg);
