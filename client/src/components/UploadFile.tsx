import Button from '~/components/Button'
import { useRef, useState } from 'react'
import { TypeImgCrop } from '~/types/posts'
import getSize from '~/utils/getSize'
import { memo } from 'react'
import IconApp from '~/assets/icons/IconApp'
import classNames from 'classnames'
interface Props {
    hiddenHead?: boolean
    setStep: (value: React.SetStateAction<number>) => void
    setImages: (value: React.SetStateAction<TypeImgCrop[]>) => void
}
const clientInit = { x: 0.5, y: 0.5 }
const UploadFile = memo(({ setStep, setImages, hiddenHead }: Props) => {
    const [drag, setDrag] = useState<boolean>(false)
    const inputFile = useRef<HTMLInputElement>(null)
    const handleClickInput = () => inputFile.current?.click()
    const handleAddFile = async (listFile: FileList) => {
        if (listFile.length) {
            const listImage: TypeImgCrop[] = []
            for (const key in listFile) {
                if (Object.prototype.hasOwnProperty.call(listFile, key)) {
                    const element = listFile[key]
                    getSize(element, (width, height) => {
                        const serverInit = { height: 1, width: 1, x: 0, y: 0 }
                        if (width < height) {
                            serverInit.height = width / height
                            serverInit.y = (1 - width / height) / 2
                        } else {
                            serverInit.width = height / width
                            serverInit.x = (1 - height / width) / 2
                        }
                        listImage.push({
                            fileCrop: element,
                            clientSize: clientInit,
                            serverSize: serverInit,
                            aspect: '1',
                        })
                        setStep(2)
                    })
                }
            }
            setImages(listImage)
        }
    }
    const handleUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        files && handleAddFile(files)
    }
    const handleDropFile = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        const files = event.dataTransfer.files
        handleAddFile(files)
    }
    return (
        <div className='flex flex-col justify-center h-full'>
            <div className='flex flex-col justify-center h-full'>
                <div
                    className={classNames('flex justify-center items-center h-11 border-b border-second', {
                        hidden: hiddenHead,
                    })}
                >
                    <h4 className='font-medium'>Create new post</h4>
                </div>
                <div
                    className='flex flex-col justify-center items-center flex-1 gap-5'
                    onDragOver={(e) => {
                        e.preventDefault()
                        setDrag(true)
                    }}
                    onDragLeave={(e) => {
                        e.preventDefault()
                        setDrag(false)
                    }}
                    onDrop={handleDropFile}
                >
                    <div className=''>
                        <IconApp
                            type='photo-clip'
                            className={classNames('h-20 w-24', {
                                'text-primary': drag,
                            })}
                        />
                    </div>
                    <p className='text-xl'>Drag photos and videos here</p>
                    <Button size='custom' onClick={handleClickInput}>
                        Select from computer
                    </Button>
                    <input ref={inputFile} onChange={handleUploadFile} type='file' accept='image/*' hidden multiple />
                </div>
            </div>
        </div>
    )
})

export default UploadFile
