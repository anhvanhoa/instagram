import AvatarEditor, { AvatarEditorProps } from 'react-avatar-editor'
import { useState, useEffect, memo } from 'react'
import { Icon } from '@iconify/react'
import { TypeImgCrop } from '~/types/posts'

interface Props {
    listImage: TypeImgCrop[]
    propsAvatarEditor: Omit<AvatarEditorProps, 'image'>
    refAvatarEdit?: React.LegacyRef<AvatarEditor> | undefined
    net?: boolean
    getIndexImg?: (index: number) => void
    indexImg?: number
}

const SliderPosts = memo(
    ({
        listImage,
        propsAvatarEditor,
        refAvatarEdit,
        net,
        getIndexImg = () => {},
        indexImg = 0,
    }: Props) => {
        const lengthListImg = listImage.length
        const [indexSlide, setIndexSlide] = useState(indexImg)
        const handleSlider = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
            const type = e.currentTarget.dataset['name']
            if (type === 'right') setIndexSlide((prev) => prev + 1)
            if (type === 'left') setIndexSlide((prev) => prev - 1)
        }
        useEffect(() => {
            setIndexSlide(indexImg)
        }, [indexImg])
        return (
            <div>
                <div className='flex relative'>
                    <div className='w-[520px] h-[520px] bg-main'>
                        <div className='flex justify-center items-center h-full w-[520px] relative'>
                            <AvatarEditor
                                ref={refAvatarEdit}
                                className='transition-all'
                                {...propsAvatarEditor}
                                image={listImage[indexSlide].fileCrop}
                                onLoadSuccess={() => getIndexImg(indexSlide)}
                            />
                            {net && (
                                <div
                                    className={`pointer-events-none absolute before:absolute before:content-[''] before:w-full before:h-[1px] before:top-1/3 after:absolute after:content-[''] after:w-full after:h-[1px]  after:bottom-1/3 before:bg-white after:bg-white`}
                                    style={{
                                        width: propsAvatarEditor.width,
                                        height: propsAvatarEditor.height,
                                    }}
                                >
                                    <div className="absolute inset-0 before:absolute before:content-[''] before:h-full before:w-[1px] before:bg-white before:left-1/3 after:absolute after:content-[''] after:h-full after:w-[1px] after:bg-white after:right-1/3"></div>
                                </div>
                            )}
                        </div>
                    </div>
                    {lengthListImg > 1 && (
                        <div className='absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1'>
                            {listImage.map((_, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={`w-[7px] h-[7px] rounded-[50%] transition-all ${
                                            index === indexSlide
                                                ? 'bg-primary'
                                                : 'bg-white/70'
                                        }`}
                                    ></div>
                                )
                            })}
                        </div>
                    )}
                    {lengthListImg > 1 && (
                        <>
                            {indexSlide !== 0 && (
                                <Icon
                                    data-name='left'
                                    onClick={handleSlider}
                                    icon='formkit:left'
                                    className='absolute top-1/2 left-4 -translate-y-1/2 text-white bg-[#333232] hover:bg-[#333232]/80 p-1 w-8 h-8 rounded-[50%] cursor-pointer transition-all'
                                />
                            )}
                            {indexSlide !== lengthListImg - 1 && (
                                <Icon
                                    data-name='right'
                                    onClick={handleSlider}
                                    icon='formkit:right'
                                    className='absolute top-1/2 right-4 -translate-y-1/2 text-white bg-[#333232] hover:bg-[#333232]/80 p-1 w-8 h-8 rounded-[50%] cursor-pointer transition-all'
                                />
                            )}
                        </>
                    )}
                </div>
            </div>
        )
    },
)

export default SliderPosts
