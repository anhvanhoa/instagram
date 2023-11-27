import PhotoClipIcon from '~/components/Icon/PhotoClipIcon';
import Button from '~/components/Button';
import { useRef, useState } from 'react';
import { TypeImgCrop } from '~/types/posts';
import getSize from '~/utils/getSize';
import { memo } from 'react';
interface Props {
    setStep: (value: React.SetStateAction<number>) => void;
    setImages: (value: React.SetStateAction<TypeImgCrop[]>) => void;
}
const clientInit = { x: 0.5, y: 0.5 };
const UploadFile = ({ setStep, setImages }: Props) => {
    const [drag, setDrag] = useState<boolean>(false);
    const inputFile = useRef<HTMLInputElement>(null);
    const handleClickInput = () => inputFile.current?.click();
    const handleAddFile = async (listFile: FileList) => {
        if (listFile.length) {
            const listImage: TypeImgCrop[] = [];
            for (const key in listFile) {
                if (Object.prototype.hasOwnProperty.call(listFile, key)) {
                    const element = listFile[key];
                    getSize(element, (width, height) => {
                        const serverInit = { height: 1, width: 1, x: 0, y: 0 };
                        if (width < height) {
                            serverInit.width = width / height;
                            serverInit.y = (1 - width / height) / 2;
                        } else {
                            serverInit.height = height / width;
                            serverInit.x = (1 - height / width) / 2;
                        }
                        listImage.push({
                            fileCrop: element,
                            clientSize: clientInit,
                            serverSize: serverInit,
                            aspect: '1',
                        });
                        setStep(2);
                    });
                }
            }
            setImages(listImage);
        }
    };
    const handleUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        files && handleAddFile(files);
    };
    const handleDropFile = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        handleAddFile(files);
    };
    return (
        <div className="flex flex-col justify-center h-full">
            <div className="flex flex-col justify-center h-full">
                <div className="flex justify-center items-center h-11 border-b border-[#ccc] border-solid">
                    <h4 className="font-medium">Tạo bài viết mới</h4>
                </div>
                <div
                    className="flex flex-col justify-center items-center flex-1 gap-5"
                    onDragOver={(e) => {
                        e.preventDefault();
                        setDrag(true);
                    }}
                    onDragLeave={(e) => {
                        e.preventDefault();
                        setDrag(false);
                    }}
                    onDrop={handleDropFile}
                >
                    <div className="">
                        <PhotoClipIcon className={drag ? 'text-primary' : ''} />
                    </div>
                    <p className="text-xl">Kéo ảnh và video vào đây</p>
                    <Button onClick={handleClickInput}>Chọn từ máy tính</Button>
                    <input ref={inputFile} onChange={handleUploadFile} type="file" accept="image/*" hidden multiple />
                </div>
            </div>
        </div>
    );
};

export default memo(UploadFile);
