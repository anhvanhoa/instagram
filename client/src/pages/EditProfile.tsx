import { Icon } from '@iconify/react'
import { useMutation } from '@tanstack/react-query'
import Tippy from '@tippyjs/react/headless'
import { memo, useState } from 'react'
import updateUser from '~/apis/updateUser'
import Button from '~/components/Button'
import ChangeAvatar from '~/components/ChangeAvatar'
import Wrapper from '~/components/Wrapper'
import useAuth from '~/hooks/useAuth'
import { Gender, UserUpdate } from '~/types/auth'

const EditProfile = () => {
    const { user, setUser } = useAuth()
    const [disable, setDisable] = useState(true)
    const [formData, setFormData] = useState<Omit<UserUpdate, 'avatar'>>({
        bio: user.bio,
        fullName: user.fullName,
        gender: user.gender,
        birthday: user.birthday,
        website: user.website,
    })
    const handleChange =
        (name: keyof UserUpdate) =>
        (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setFormData((prev) => ({ ...prev, [name]: event.target.value }))
            setDisable(false)
        }
    const handleGender = (value: Gender) => {
        setFormData((prev) => ({ ...prev, gender: value }))
        setDisable(false)
    }
    const { mutate, isPending } = useMutation({
        mutationKey: [formData],
        mutationFn: (formData: UserUpdate) => updateUser(formData),
        onSuccess: (data) => {
            setUser({
                ...data,
                accessToken: user.accessToken,
            })
        },
    })
    const handleUploadImage = (avatar: string) => {
        mutate({
            ...formData,
            avatar: avatar,
        })
    }
    const updateUserApi = () => {
        mutate({ ...formData, avatar: user.avatar })
        setDisable(true)
    }

    return (
        <div>
            <div className='max-w-3xl mx-auto p-4 sm:p-8 mb-2 md:mt-4 pb-8'>
                <h4 className='font-bold text-xl'>Edit profile</h4>
                <div className='mt-8'>
                    <ChangeAvatar changeAvatar={handleUploadImage} />
                    <Input
                        value={formData.website}
                        onChange={handleChange('website')}
                        label='Website'
                    />
                    <div className='mt-4 md:mt-7'>
                        <p className='mb-2 font-bold'>Bio</p>
                        <textarea
                            value={formData.bio}
                            onChange={handleChange('bio')}
                            className='w-full border border-second rounded-2xl py-3 px-4 outline-none bg-transparent resize-none scrollbar'
                            rows={4}
                        >
                            {formData.bio}
                        </textarea>
                    </div>
                    <Input isDisabled value={user.email} label='Email' />
                    <Input isDisabled value={user.numberPhone} label='Mobile number' />
                    <Input
                        onChange={handleChange('fullName')}
                        value={formData.fullName}
                        label='Full name'
                    />
                    <SelectGender
                        gender={formData.gender}
                        onChangeGender={handleGender}
                    />
                    <Input
                        onChange={handleChange('birthday')}
                        value={formData.birthday}
                        label='Birthday'
                        type='date'
                    />
                    <div className='flex justify-end'>
                        <Button
                            loading={isPending}
                            disable={disable}
                            onClick={updateUserApi}
                            size='large'
                            className='mt-8 py-3 w-40'
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile

interface PropsInput {
    onChange?: (
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
    ) => void
    value: string
    type?: 'text' | 'date' | 'number'
    isDisabled?: boolean
    label: string
}

const Input = memo(
    ({ onChange, value, isDisabled = false, type = 'text', label }: PropsInput) => {
        return (
            <div className='mt-4 md:mt-7'>
                <p className='font-bold mb-2'>{label}</p>
                <input
                    onChange={onChange}
                    type={type}
                    value={value}
                    disabled={isDisabled}
                    className='border border-second bg-transparent w-full p-3 outline-none rounded-xl'
                />
            </div>
        )
    },
)

const SelectGender = ({
    gender,
    onChangeGender,
}: {
    gender: Gender
    onChangeGender: (gender: Gender) => void
}) => {
    const handleGender = (gender: Gender) => () => onChangeGender(gender)
    return (
        <div className='mt-4 md:mt-7'>
            <p className='font-bold mb-2'>Gender</p>
            <Tippy
                trigger='click'
                onTrigger={(instance) => {
                    const items = instance.popper.querySelectorAll('p')
                    items.forEach((item) => (item.onclick = () => instance.hide()))
                }}
                interactive
                render={() => (
                    <Wrapper>
                        <div className='bg-white rounded-2xl p-2 min-w-40 *:cursor-pointer'>
                            <p
                                onClick={handleGender('male')}
                                className='hover:bg-gray-100 rounded-xl px-4 py-2'
                            >
                                Male
                            </p>
                            <p
                                onClick={handleGender('female')}
                                className='hover:bg-gray-100 rounded-xl px-4 py-2'
                            >
                                Female
                            </p>
                            <p
                                onClick={handleGender('other')}
                                className='hover:bg-gray-100 rounded-xl px-4 py-2'
                            >
                                Other
                            </p>
                        </div>
                    </Wrapper>
                )}
                placement={'top-end'}
            >
                <div className='cursor-pointer flex items-center border border-second bg-transparent w-full p-3 outline-none rounded-xl'>
                    <p className='flex-1 capitalize'>{gender}</p>
                    <Icon icon='grommet-icons:down' className='size-5' />
                </div>
            </Tippy>
        </div>
    )
}
