import { Icon } from '@iconify/react/dist/iconify.js'
import { useMutation } from '@tanstack/react-query'
import classNames from 'classnames'
import { useState } from 'react'
import { CroppedRect } from 'react-avatar-editor'
import { Link } from 'react-router-dom'
import uploadImg from '~/apis/uploadImg'
import uploadPosts, { PostsUpload } from '~/apis/uploadPosts'
import Button from '~/components/Button'
import Crop from '~/components/Crop'
import HeaderMobile from '~/components/HeaderMobile'
import OverLay from '~/components/OverLay'
import UploadFile from '~/components/UploadFile'
import { TypeImgCrop } from '~/types/posts'

let contents: string[] = []
export const CreatePosts = () => {
    const [images, setImages] = useState<TypeImgCrop[]>([])
    const [step, setStep] = useState<number>(1)
    const [overlay, setOverlay] = useState(false)
    const [description, setDescription] = useState<string>('')
    const changeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value.length > 2200) return
        setDescription(e.target.value)
    }
    const {
        mutate: mutatePosts,
        isPending: isPending2,
        isError: isError2,
        isSuccess: isSuccess2,
        data: posts,
    } = useMutation({
        mutationFn: (posts: PostsUpload) => uploadPosts(posts),
    })
    const { mutate, isPending, isError, isSuccess } = useMutation({
        onSuccess: (data) => {
            contents.push(data)
            if (contents.length === images.length) {
                mutatePosts({
                    title: description,
                    contents,
                })
                contents = []
            }
        },
        mutationFn: (data: FormData) => uploadImg(data),
    })
    function formData(fileCrop: File, serverSize: CroppedRect) {
        const formData = new FormData()
        formData.append('images', fileCrop)
        formData.append('width', String(serverSize.width))
        formData.append('height', String(serverSize.height))
        formData.append('x', String(serverSize.x))
        formData.append('y', String(serverSize.y))
        return formData
    }
    const apiCrop = async () => {
        setOverlay(true)
        images.forEach(async ({ serverSize, fileCrop }) => {
            const data = formData(fileCrop, serverSize)
            mutate(data)
        })
    }
    return (
        <div>
            <HeaderMobile
                title='Create posts'
                contextNext={
                    step === 2 && (
                        <Button loading={isPending || isPending2} onClick={apiCrop} size='custom' type='text'>
                            Posts
                        </Button>
                    )
                }
            />
            <div className='lg:flex lg:justify-center mt-4 gap-4'>
                <div className='mx-auto lg:mr-0 w-80 xs:w-[400px] lg:w-[520px] aspect-square rounded-md'>
                    {step === 1 && <UploadFile hiddenHead setStep={setStep} setImages={setImages} />}
                    {step === 2 && <Crop setImages={setImages} images={images} />}
                </div>
                <div className='border-l'></div>
                <div
                    className={classNames('mx-auto w-80 xs:w-[400px] lg:w-[250px] xl:w-80 lg:ml-0', {
                        hidden: step !== 2,
                    })}
                >
                    <div>
                        <textarea
                            value={description}
                            onChange={changeDescription}
                            placeholder='What are you thinking ?'
                            className='w-full h-32 lg:h-60 outline-none mt-3 resize-none px-2 text-gray-500'
                        ></textarea>
                    </div>
                </div>
            </div>
            {overlay && (
                <OverLay>
                    <div className='w-60 h-14 bg-white rounded-xl px-4'>
                        {isSuccess && isSuccess2 && (
                            <div>
                                <div className='pt-1 flex items-center text-green-800 justify-center h-full gap-2 text-lg'>
                                    <div>
                                        <Icon icon='clarity:success-standard-line' className='w-7' />
                                    </div>
                                    <p>Upload success</p>
                                </div>
                                <Link
                                    to={`/p/${posts._id}`}
                                    className='text-xs text-center block text-primary font-medium'
                                >
                                    Go posts
                                </Link>
                            </div>
                        )}
                        {(isError2 || isError) && (
                            <div>
                                <div className='pt-1 flex justify-center items-center gap-2 text-red-500 text-lg'>
                                    <div>
                                        <Icon icon='carbon:close-outline' className='w-6' />
                                    </div>
                                    <p>Upload fail</p>
                                </div>
                                <Link to={'/'} className='text-xs text-center block text-primary font-medium'>
                                    back home
                                </Link>
                            </div>
                        )}
                        {(isPending || isPending2) && (
                            <div className='flex justify-center items-center gap-3 h-full'>
                                <div>
                                    <Icon icon='nonicons:loading-16' className='w-5 animate-spin' />
                                </div>
                                <p>Uploading ....</p>
                            </div>
                        )}
                    </div>
                </OverLay>
            )}
        </div>
    )
}
