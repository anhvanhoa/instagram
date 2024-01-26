import Button from '~/components/Button'
import { Icon } from '@iconify/react'
interface Props {
    onPrev: () => void
    onNext: () => void
    title: string
    textNext?: string
    isLoading?: boolean
}
const HeadCreatePosts = ({ onPrev, title, onNext, isLoading, textNext = 'Next' }: Props) => {
    return (
        <div>
            <div className='flex justify-between items-center h-11 border-b border-gray-50/20'>
                <Button onClick={onPrev} type='custom' className='w-max text-white px-2'>
                    <Icon icon='ep:back' className='text-2xl cursor-pointer' />
                </Button>
                <h4 className='font-medium'>{title}</h4>
                <Button loading={isLoading} type='text' className='mr-3' onClick={onNext}>
                    {textNext}
                </Button>
            </div>
        </div>
    )
}

export default HeadCreatePosts
