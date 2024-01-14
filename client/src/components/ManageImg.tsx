import TippyHeadLess from '@tippyjs/react/headless'
import { useState, useRef, memo } from 'react'
import { Icon } from '@iconify/react'
import Button from '~/components/Button'
import { TypeImgCrop } from '~/types/posts'
import getSize from '~/utils/getSize'
interface Props {
    listImage: TypeImgCrop[]
    setImages: (value: React.SetStateAction<TypeImgCrop[]>) => void
    onChooseImg: (value: React.SetStateAction<number>) => void
}
const clientInit = { x: 0.5, y: 0.5 }
const ManageImg = memo(({ listImage, setImages, onChooseImg }: Props) => {
    const [slider, setSlider] = useState(0)
    const inputFile = useRef<HTMLInputElement>(null)
    const handleClickInput = () => inputFile.current?.click()
    const handleUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const length = event.target.files?.length
        if (event.target.files?.length) {
            const listImage: TypeImgCrop[] = []
            for (const key in event.target.files) {
                if (Object.prototype.hasOwnProperty.call(event.target.files, key)) {
                    const element = event.target.files[key]
                    getSize(element, (width, height) => {
                        const serverInit = { height: 1, width: 1, x: 0, y: 0 }
                        if (width < height) {
                            serverInit.width = width / height
                            serverInit.y = (1 - width / height) / 2
                        } else {
                            serverInit.height = height / width
                            serverInit.x = (1 - height / width) / 2
                        }
                        listImage.push({
                            fileCrop: element,
                            clientSize: clientInit,
                            serverSize: serverInit,
                            aspect: '1',
                        })
                        length === listImage.length && setImages((prev) => [...prev, ...listImage])
                    })
                }
            }
        }
    }
    return (
        <>
            <TippyHeadLess
                trigger='click'
                placement='top-end'
                interactive
                render={() => (
                    <div className='flex items-center h-32 max-w-sm bg-[#222222]/90 rounded-xl'>
                        <div className='flex-1 h-full overflow-hidden mx-3 py-4 relative '>
                            <div
                                className='w-full flex h-full gap-3 relative transition-all'
                                style={{ left: `-${slider}%` }}
                            >
                                {listImage.map((element, index) => (
                                    <img
                                        onClick={() => onChooseImg(index)}
                                        key={index}
                                        src={URL.createObjectURL(element.fileCrop)}
                                        alt=''
                                        className='aspect-square rounded-md cursor-pointer'
                                    />
                                ))}
                            </div>
                            {listImage.length > 3 && (
                                <div>
                                    <Icon
                                        onClick={() =>
                                            setSlider((prev) =>
                                                prev >= 0 ? prev - 33.3 : (listImage.length - 3) * 33.3,
                                            )
                                        }
                                        icon='formkit:left'
                                        className='absolute top-1/2 left-2 -translate-y-1/2 text-white bg-[#333232]/80 p-1 w-8 h-8 rounded-circle cursor-pointer'
                                    />
                                    <Icon
                                        onClick={() =>
                                            setSlider((prev) =>
                                                prev < (listImage.length - 3) * 33.3 ? prev + 33.3 : 0,
                                            )
                                        }
                                        icon='formkit:right'
                                        className='absolute top-1/2 right-2 -translate-y-1/2 text-white bg-[#333232]/80 p-1 w-8 h-8 rounded-circle cursor-pointer'
                                    />
                                </div>
                            )}
                        </div>
                        <Button onClick={handleClickInput} type='text' className='p-0 text-white'>
                            <Icon icon='formkit:add' className='text-[2rem]' />
                        </Button>
                    </div>
                )}
            >
                <div className=''>
                    <Button
                        type='custom'
                        className='w-full rounded-[50%] text-white cursor-pointer bg-[#222222] hover:bg-[#222]/80 rounded-circle inline-block py-2'
                    >
                        <Icon icon='basil:copy-outline' className='text-2xl' />
                    </Button>
                    <input ref={inputFile} onChange={handleUploadFile} type='file' accept='image/*' hidden multiple />
                </div>
            </TippyHeadLess>
        </>
    )
})

export default ManageImg
