import useAuth from '~/hooks/useAuth'
import Img from './Img'
import { Icon } from '@iconify/react/dist/iconify.js'
import Button from './Button'
import getSize from '~/utils/getSize'
import { CroppedRect } from 'react-avatar-editor'
import Overlay from './Overlaying'
import Wrapper from './Wrapper'
import { stopPropagation } from '~/utils/helper'
import { useUploadImage } from '~/hooks/image.hook'
import React from 'react'

interface Props {
    changeAvatar: (avatar: string) => void
}

type ChangeOverlay = (isOvelay: boolean) => void

const ChangeAvatar: React.FC<Props> = ({ changeAvatar }) => {
    const { user } = useAuth()
    const uploadImg = useUploadImage()

    const handleUpload = async (crop: CroppedRect, file: Blob) => {
        const url = await uploadImg.handleFormData(crop, file)
        changeAvatar(url)
    }
    const changeImage =
        (changeOverlay: ChangeOverlay) =>
        (event: React.ChangeEvent<HTMLInputElement>) => {
            if (!event.target.files) return
            changeOverlay(false)
            const file = event.target.files[0]
            getSize(file, (width, height) => {
                if (width < height) {
                    const crop = {
                        height: width / height,
                        y: (1 - width / height) / 2,
                        width: 1,
                        x: 0,
                    }
                    handleUpload(crop, file)
                } else {
                    const crop = {
                        width: height / width,
                        x: (1 - height / width) / 2,
                        height: 1,
                        y: 0,
                    }
                    handleUpload(crop, file)
                }
            })
        }
    const handleRemove = (changeOverlay: ChangeOverlay) => () => {
        changeOverlay(false)
        changeAvatar('')
    }
    return (
        <div>
            <div className='flex items-center justify-between bg-gray-100 px-6 py-4 rounded-xl flex-wrap gap-4'>
                <div className='flex items-center gap-4'>
                    <div className='relative'>
                        <Img
                            className='object-cover w-14 h-14'
                            src={user.avatar}
                            alt={user.fullName}
                            isCircle
                        />
                        {uploadImg.isPending && (
                            <div className='absolute inset-0 flex justify-center items-center bg-gray-900/50 rounded-full'>
                                <Icon
                                    icon='eos-icons:bubble-loading'
                                    className='size-6 text-white'
                                />
                            </div>
                        )}
                    </div>
                    <div>
                        <h3 className='font-semibold'>{user.userName}</h3>
                        <h2 className='text-sm'>{user.fullName}</h2>
                    </div>
                </div>
                <Overlay
                    render={({ changeOverlay }) => (
                        <Model
                            changeImage={changeImage(changeOverlay)}
                            handleRemove={handleRemove(changeOverlay)}
                        />
                    )}
                >
                    <Button className='py-2.5 leading-4'>Change photo</Button>
                </Overlay>
            </div>
        </div>
    )
}

export default ChangeAvatar

type PropsModel = {
    changeImage?: (event: React.ChangeEvent<HTMLInputElement>) => void
    handleRemove?: () => void
}
const Model: React.FC<PropsModel> = ({ changeImage, handleRemove }) => {
    return (
        <Wrapper classname='max-w-sm rounded-3xl'>
            <div onClick={stopPropagation(true)}>
                <p className='text-center py-8 text-xl'>Change Profile Photo</p>
                <div className='*:!font-medium flex flex-col *:text-base'>
                    <button className=''>
                        <input onChange={changeImage} type='file' hidden id='avatar' />
                        <label
                            htmlFor='avatar'
                            className='block py-3 border-t text-primary text-center cursor-pointer'
                        >
                            Upload new avatar
                        </label>
                    </button>
                    <Button
                        onClick={handleRemove}
                        type='block'
                        className='py-3 !text-red-500 !hover:text-red-600 border-t'
                    >
                        Remove current avatar
                    </Button>
                </div>
            </div>
            <Button type='block' className='py-3 border-t !text-black'>
                Cancel
            </Button>
        </Wrapper>
    )
}
