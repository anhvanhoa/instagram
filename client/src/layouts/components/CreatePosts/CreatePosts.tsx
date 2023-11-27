import OverLay from '~/components/OverLay';
import Cancel from '~/components/Cancel';
import classNames from 'classnames';
import { useState, useCallback } from 'react';
import UploadFile from '~/components/UploadFile';
import ConfirmPost from '~/components/ConfirmPost';
import CropImage from '~/components/CropImage';
import EditImg from '~/components/EditImg';
import PreviewImg from '~/components/PreviewImg';
import { TypeImgCrop } from '~/types/posts';

interface Props {
    handleClose: () => void;
}

const CreatePosts = ({ handleClose }: Props) => {
    const [images, setImages] = useState<TypeImgCrop[]>([]);
    const [step, setStep] = useState<number>(1);
    const [cancel, setCancel] = useState(false);
    const handleCloseFile = useCallback(() => {
        if (images.length > 0) setCancel(true);
        else handleClose();
    }, [handleClose, images.length]);
    const handleBack = () => setCancel(false);
    return (
        <>
            <OverLay onClose={handleCloseFile} iconClose>
                <div className={classNames('bg-white min-w-[520px] h-[560px] rounded-2xl z-10 overflow-hidden')}>
                    {step === 1 && <UploadFile setImages={setImages} setStep={setStep} />}
                    {step === 2 && <CropImage onStep={setStep} setImages={setImages} listImage={images} />}
                    {step === 3 && <EditImg onStep={setStep} listImage={images} />}
                    {step === 4 && <PreviewImg onStep={setStep} listImage={images} />}
                    {step === 5 && <ConfirmPost />}
                </div>
            </OverLay>
            {cancel && <Cancel handleBack={handleBack} handleCancel={handleClose} />}
        </>
    );
};

export default CreatePosts;
