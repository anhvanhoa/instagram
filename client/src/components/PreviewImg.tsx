import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import { TypeImgCrop } from '~/types/posts'
import getSize from '~/utils/getSize'
import HeadCreatePosts from './HeadCreatePosts'
import SliderPosts from './SliderPosts'
import UserName from './UserName'
import useContextUser from '~/store/hook'
import { useMutation } from '@tanstack/react-query'
import uploadImg from '~/apis/uploadImg'
import uploadPosts, { PostsUpload } from '~/apis/uploadPosts'
import Img from './Img'
import { CroppedRect } from 'react-avatar-editor'

interface Props {
    listImage: TypeImgCrop[]
    onStep: (value: React.SetStateAction<number>) => void
}
let contents: string[] = []
const PreviewImg = ({ listImage, onStep }: Props) => {
    const { state: user } = useContextUser()
    const [description, setDescription] = useState<string>('')
    const [isUploadPosts, setIsUploadPosts] = useState<boolean>(false)
    const [indexSlide, setIndexSlide] = useState(0)
    const [sizeCrop, setSizeCrop] = useState({ height: 520, width: 520 })
    const { mutate: mutatePosts, isPending: isPending2 } = useMutation({
        mutationFn: (posts: PostsUpload) => uploadPosts(posts),
    })
    const { mutate, isPending } = useMutation({
        onSuccess: (data) => {
            contents.push(data)
            if (contents.length === listImage.length) {
                mutatePosts(
                    {
                        title: description,
                        contents,
                    },
                    {
                        onSuccess: () => onStep(4),
                        onError: () => onStep(5),
                    },
                )
                setIsUploadPosts(false)
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
        setIsUploadPosts(true)
        listImage.forEach(async ({ serverSize, fileCrop }) => {
            const data = formData(fileCrop, serverSize)
            mutate(data)
        })
    }
    useEffect(() => {
        let width = 520
        let height = 520
        const aspect = listImage[indexSlide].aspect
        switch (aspect) {
            case '4/5':
                width *= 0.8
                setSizeCrop({ height, width })
                break
            case '16/9':
                height *= 0.5625
                setSizeCrop({ height, width })
                break
            case 'origin':
                getSize(listImage[indexSlide].fileCrop, (widthImg, heightImg) => {
                    if (heightImg > widthImg) {
                        const ratio = heightImg / widthImg
                        width = height / ratio
                        setSizeCrop({ height, width })
                    } else {
                        const ratio = widthImg / heightImg
                        height = width / ratio
                        setSizeCrop({ height, width })
                    }
                })
                break
            default:
                setSizeCrop({ height, width })
                break
        }
    }, [indexSlide, listImage])
    return (
        <div>
            {isUploadPosts && <div className='bg-black/5 fixed inset-0 z-50'></div>}
            <HeadCreatePosts
                isLoading={isPending || isPending2}
                onPrev={() => onStep(2)}
                onNext={apiCrop}
                title='Create posts new'
                textNext='Share'
            />
            <div className='flex'>
                <div className='w-[520px] h-[520px] bg-black/50 relative flex justify-center items-center'>
                    <SliderPosts
                        getIndexImg={(i) => setIndexSlide(i)}
                        listImage={listImage}
                        propsAvatarEditor={{
                            style: { cursor: 'pointer' },
                            height: sizeCrop.height,
                            width: sizeCrop.width,
                            border: 0,
                            position: { x: listImage[indexSlide].clientSize.x, y: listImage[indexSlide].clientSize.y },
                        }}
                    />
                </div>
                <div className='w-[340px] border-l'>
                    <div className='flex items-center p-4 gap-2'>
                        <Img
                            className='rounded-[50%] w-8 h-8 aspect-square object-cover relative z-10 p-px mt-[2px]'
                            src={user.avatar}
                            alt={user.userName}
                        />
                        <UserName user={user} />
                    </div>
                    <div>
                        <textarea
                            onChange={(e) => {
                                if (e.target.value.length > 2200) return
                                setDescription(e.target.value)
                            }}
                            value={description}
                            rows={10}
                            placeholder='Viết chú thích ...'
                            className='w-full resize-none px-4 py-1 outline-none'
                        ></textarea>
                        <div className='flex justify-between px-4 text-gray-500'>
                            <p className='text-xs'>{description.length}/2.200</p>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <div className='flex items-center justify-between px-4 py-3 border-y border-solid border-[#ccc]'>
                            <p>Cài đặt nâng cao</p>
                            <Icon icon='uiw:down' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PreviewImg
