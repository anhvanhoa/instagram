import { useMutation, useQuery } from '@tanstack/react-query'
import { useRef, useState } from 'react'
import profile from '~/apis/profile'
import updateUser from '~/apis/updateUser'
import uploadImg from '~/apis/uploadImg'
import Button from '~/components/Button'
import Img from '~/components/Img'
import useContextUser from '~/store/hook'
import { User, UserUpdate } from '~/types/auth'
import getSize from '~/utils/getSize'
interface AvatarClient {
    url: string
    file: File | null
    sizeCrop: {
        x: number
        y: number
        width: number
        height: number
    }
}
const EditProfile = () => {
    const { state, dispatch } = useContextUser()
    const [disable, setDisable] = useState(true)
    const inputAvatar = useRef<HTMLInputElement>(null)
    const [avatarClient, setAvatarClient] = useState<AvatarClient>({
        url: '',
        file: null,
        sizeCrop: { height: 1, width: 1, x: 0, y: 0 },
    })
    const [formData, setFormData] = useState<UserUpdate>({
        avatar: state.avatar,
        bio: state.bio,
        fullName: state.fullName,
        gender: state.gender,
        birthday: state.birthday,
    })
    const handleChange =
        (name: keyof User) =>
        (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            setFormData((prev) => ({ ...prev, [name]: event.target.value }))
            setDisable(false)
        }
    const { mutate: mutateUpload, isPending: isPending2 } = useMutation({
        mutationKey: [avatarClient.url],
        mutationFn: (formData: FormData) => uploadImg(formData),
    })
    const { mutate, isPending } = useMutation({
        mutationKey: [formData],
        mutationFn: (formData: UserUpdate) => updateUser(formData),
    })
    const { refetch } = useQuery({
        queryKey: ['user'],
        queryFn: () => profile(state._id),
        enabled: false,
    })
    const handleClick = () => inputAvatar.current?.click()
    const changeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return
        const file = event.target.files[0]
        const url = URL.createObjectURL(file)
        getSize(file, (width, height) => {
            if (width < height) {
                setAvatarClient(({ sizeCrop }) => ({
                    url,
                    file: file,
                    sizeCrop: {
                        ...sizeCrop,
                        height: width / height,
                        y: (1 - width / height) / 2,
                    },
                }))
            } else {
                setAvatarClient(({ sizeCrop }) => ({
                    url,
                    file: file,
                    sizeCrop: {
                        ...sizeCrop,
                        width: height / width,
                        y: (1 - height / width) / 2,
                    },
                }))
            }
        })
        setDisable(false)
    }
    const updateUserApi = (avatar?: string) => {
        mutate(
            { ...formData, avatar: avatar ? avatar : formData.avatar },
            {
                onSuccess: () =>
                    refetch().then(({ data }) => {
                        if (!data) return
                        dispatch({
                            type: 'UPDATE',
                            payload: data,
                        })
                    }),
            },
        )
        setDisable(true)
    }
    const uploadImage = async () => {
        if (!avatarClient.file) return
        const form = new FormData()
        form.append('images', avatarClient.file)
        form.append('width', String(avatarClient.sizeCrop.width))
        form.append('height', String(avatarClient.sizeCrop.height))
        form.append('x', String(avatarClient.sizeCrop.x))
        form.append('y', String(avatarClient.sizeCrop.y))
        mutateUpload(form, {
            onSuccess: (avatar) => updateUserApi(avatar),
        })
    }
    const handleApi = () => {
        if (avatarClient.file) {
            uploadImage()
        } else updateUserApi()
    }
    return (
        <div>
            <h3 className='mt-6 ml-6 font-semibold text-2xl'>Settings</h3>
            <div className='max-w-2xl mx-auto p-8 border mt-8'>
                <h4 className='text-2xl'>Edit profile</h4>
                <div className='mt-10 px-20'>
                    <div className='flex gap-8 mt-7'>
                        <div className='w-1/4 flex justify-end'>
                            {!avatarClient.url && (
                                <Img
                                    className='w-10 h-10 rounded-[50%] object-cover'
                                    src={formData.avatar}
                                    alt={formData.fullName}
                                />
                            )}
                            {avatarClient.url && (
                                <img className='w-10 h-10 rounded-[50%] object-cover' src={avatarClient.url} alt='' />
                            )}
                        </div>
                        <div className='flex-1'>
                            <h3 className='leading-5'>{state.userName}</h3>
                            <input onChange={changeImage} ref={inputAvatar} type='file' hidden />
                            <Button onClick={handleClick} type='text' className='-ml-2'>
                                Change profile photo
                            </Button>
                        </div>
                    </div>
                    <div className='flex gap-8 mt-7'>
                        <p className='font-semibold w-1/4 text-right'>Bio</p>
                        <div className='flex-1'>
                            <textarea
                                value={formData.bio}
                                onChange={handleChange('bio')}
                                className='w-full border rounded-md p-1 outline-none'
                                rows={2}
                            >
                                {formData.bio}
                            </textarea>
                        </div>
                    </div>
                    <div className='flex gap-8 mt-7'>
                        <p className='font-semibold w-1/4 text-right'>Email</p>
                        <div className='flex-1'>
                            <input
                                disabled
                                type='text'
                                value={state.email}
                                className='border w-full pl-1 py-1 outline-none rounded-md'
                            />
                        </div>
                    </div>
                    <div className='flex gap-8 mt-7'>
                        <p className='font-semibold w-1/4 text-right'>Mobile number</p>
                        <div className='flex-1'>
                            <input
                                disabled
                                type='text'
                                value={state.numberPhone}
                                className='border w-full pl-1 py-1 outline-none rounded-md'
                            />
                        </div>
                    </div>
                    <div className='flex gap-8 mt-7'>
                        <p className='font-semibold w-1/4 text-right'>Full name</p>
                        <div className='flex-1'>
                            <input
                                onChange={handleChange('fullName')}
                                type='text'
                                value={formData.fullName}
                                className='border w-full pl-1 py-1 outline-none rounded-md'
                            />
                        </div>
                    </div>
                    <div className='flex gap-8 mt-7'>
                        <p className='font-semibold w-1/4 text-right'>Gender</p>
                        <div className='flex-1'>
                            <select
                                className='border rounded-md'
                                value={formData.gender}
                                onChange={handleChange('gender')}
                            >
                                <option hidden></option>
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex gap-8 mt-7'>
                        <p className='font-semibold w-1/4 text-right'>Birthday</p>
                        <div className='flex-1'>
                            <input
                                onChange={handleChange('birthday')}
                                type='date'
                                value={formData.birthday}
                                className='border w-full pl-1 py-1 outline-none rounded-md'
                            />
                        </div>
                    </div>
                    <div className='flex gap-8 mt-7'>
                        <p className='font-semibold w-1/4 text-right'></p>
                        <div className='flex-1'>
                            <Button loading={isPending || isPending2} disable={disable} onClick={handleApi}>
                                Submit
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile
