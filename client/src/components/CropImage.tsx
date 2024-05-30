import AvatarEditor, { Position } from 'react-avatar-editor'
import { useEffect, useRef, useState, memo, useCallback } from 'react'
import { TypeImgCrop } from '~/types/posts'
import SliderPosts from '~/components/SliderPosts'
import Tools from './Tools'
import ManageImg from './ManageImg'
import getSize from '~/utils/getSize'
import HeadCreatePosts from '~/components/HeadCreatePosts'
interface Props {
    setImages: (value: React.SetStateAction<TypeImgCrop[]>) => void
    listImage: TypeImgCrop[]
    onStep: (value: React.SetStateAction<number>) => void
}
const CropImage = memo(({ setImages, listImage, onStep }: Props) => {
    const [valueRag, setValueRag] = useState(0)
    const [net, setNet] = useState(false)
    const [aspect, setAspect] = useState(() => {
        const aspect = listImage[0].aspect
        return aspect
    })
    const [indexSlide, setIndexSlide] = useState(0)
    const [sizeCrop, setSizeCrop] = useState({ height: 520, width: 520 })
    const [positionClient, setPositionClient] = useState<{ x: number; y: number }>({
        x: 0.5,
        y: 0.5,
    })
    const refImg = useRef<AvatarEditor>(null)
    const handlePosition = (position: Position) => {
        setNet(true)
        setPositionClient(position)
    }
    const handleMouseUp = useCallback(() => {
        if (refImg.current) {
            setNet(false)
            const sizeReact = refImg.current.getCroppingRect()
            setImages((prev) => {
                prev[indexSlide].serverSize = sizeReact
                prev[indexSlide].clientSize = positionClient
                return prev
            })
        }
    }, [indexSlide, positionClient, setImages])
    const handlePositionSlider = useCallback(
        (index: number) => {
            const file = listImage[index]
            setPositionClient(file.clientSize)
        },
        [listImage],
    )
    useEffect(() => {
        let width = 520
        let height = 520
        switch (aspect) {
            case '4/5':
                width *= 0.8
                setSizeCrop({ height, width })
                break
            case '16/9':
                height *= 0.5625
                setSizeCrop({ height, width })
                break
            default:
                setSizeCrop({ height, width })
                break
        }
        handlePositionSlider(indexSlide)
    }, [aspect, handlePositionSlider, indexSlide, listImage])
    const handleAspect = useCallback(
        (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            const typeAspect = event.currentTarget.dataset['aspect']
            if (!typeAspect) return
            setAspect(typeAspect)
            setImages((prev) => {
                prev.forEach((_, i) => {
                    let a = 1
                    if (typeAspect === '4/5') a = 4 / 5
                    if (typeAspect === '16/9') a = 4 / 5
                    prev[i].aspect = typeAspect
                    if (i === indexSlide) return
                    getSize(prev[i].fileCrop, (width, height) => {
                        if (width < height) {
                            prev[i].serverSize.height = (width / height) * a
                            prev[i].serverSize.width = 1
                            prev[i].serverSize.y = (1 - prev[i].serverSize.height) / 2
                            prev[i].serverSize.x = 0
                        } else {
                            prev[i].serverSize.width = (height / width) * a
                            prev[i].serverSize.height = 1
                            prev[i].serverSize.x = (1 - prev[i].serverSize.width) / 2
                            prev[i].serverSize.y = 0
                        }
                    })
                })
                return prev
            })
            handleMouseUp()
        },
        [handleMouseUp, indexSlide, setImages],
    )
    const handleNext = () => onStep(3)
    const handChangeIndex = useCallback((index: number) => setIndexSlide(index), [])
    return (
        <div>
            <HeadCreatePosts onPrev={() => onStep(1)} onNext={handleNext} title='Crop' />
            <div className='flex relative'>
                <div className='w-[520px] h-[520px] bg-main'>
                    <div className='flex justify-center items-center h-full w-[520px] relative'>
                        <SliderPosts
                            getIndexImg={handChangeIndex}
                            net={net}
                            indexImg={indexSlide}
                            listImage={listImage}
                            propsAvatarEditor={{
                                border: 0,
                                height: sizeCrop.height,
                                width: sizeCrop.width,
                                scale: 1 + valueRag / 20,
                                onPositionChange: handlePosition,
                                onMouseUp: handleMouseUp,
                                position: positionClient,
                            }}
                            refAvatarEdit={refImg}
                        />
                    </div>
                </div>
                <div className='absolute w-full bottom-4 px-4 flex items-center justify-between'>
                    <Tools
                        onAspect={handleAspect}
                        valueRange={valueRag}
                        onRange={setValueRag}
                    />
                    <ManageImg
                        listImage={listImage}
                        onChooseImg={setIndexSlide}
                        setImages={setImages}
                    />
                </div>
            </div>
        </div>
    )
})

export default CropImage
