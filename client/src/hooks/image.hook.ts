import { useMutation } from '@tanstack/react-query'
import { CroppedRect } from 'react-avatar-editor'
import uploadImgRequest from '~/apis/uploadImgRequest'

const useUploadImage = () => {
    const uploadImg = useMutation({
        mutationKey: ['upload-img'],
        mutationFn: (formData: FormData) => uploadImgRequest(formData),
    })
    const handleFormData = ({ height, width, x, y }: CroppedRect, file: Blob) => {
        const form = new FormData()
        form.append('images', file)
        form.append('width', String(width))
        form.append('height', String(height))
        form.append('x', String(x))
        form.append('y', String(y))
        return uploadImg.mutateAsync(form)
    }
    return { handleFormData, ...uploadImg }
}

export { useUploadImage }
