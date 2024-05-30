import OverLay from '~/components/OverLay'
import classNames from 'classnames'
import { useState } from 'react'
import UploadFile from '~/components/UploadFile'
import CropImage from '~/components/CropImage'
import { TypeImgCrop } from '~/types/posts'
// import EditImg from './EditImg'
import PreviewImg from './PreviewImg'
import ConfirmPost from './ConfirmPost'

interface Props {
    handleClose: () => void
}

const CreatePosts = ({ handleClose }: Props) => {
    const [images, setImages] = useState<TypeImgCrop[]>([])
    const [step, setStep] = useState<number>(1)
    return (
        <div>
            <OverLay onClose={handleClose} iconClose zIndex={1200}>
                <div
                    className={classNames(
                        'bg-main min-w-[520px] h-[560px] rounded-2xl z-10 overflow-hidden border border-second shadow-sidebar',
                    )}
                >
                    {step === 1 && <UploadFile setImages={setImages} setStep={setStep} />}
                    {step === 2 && (
                        <CropImage
                            onStep={setStep}
                            setImages={setImages}
                            listImage={images}
                        />
                    )}
                    {/* {step === 3 && <EditImg onStep={setStep} listImage={images} />} */}
                    {step === 3 && <PreviewImg onStep={setStep} listImage={images} />}
                    {(step === 4 || step === 5) && <ConfirmPost success={step} />}
                </div>
            </OverLay>
        </div>
    )
}

export default CreatePosts
