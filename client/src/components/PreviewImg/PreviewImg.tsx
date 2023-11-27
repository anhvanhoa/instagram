import Avatar from '~/components/Avatar';
import UserName from '../UserName';
import { User } from '~/types/auth';
import httpGetUser from '~/apis/httpGetUser';
import { initialUser } from '~/types/auth';
import SmileIcon from '~/components/Icon/SmileIcon';
import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import HeadCreatePosts from '../HeadCreatePosts';
import { TypeImgCrop } from '~/types/posts';
import SliderPosts from '../SliderPosts';
import getSize from '~/utils/getSize';
import httpCropImg from '~/apis/httpCropImg';

interface Props {
    listImage: TypeImgCrop[];
    onStep: (value: React.SetStateAction<number>) => void;
}

const PreviewImg = ({ listImage, onStep }: Props) => {
    const [user, setUser] = useState<User>(initialUser);
    const [description, setDescription] = useState<string>('');
    const [indexSlide, setIndexSlide] = useState(0);
    const [sizeCrop, setSizeCrop] = useState({ height: 520, width: 520 });
    const apiGetUser = () => {
        httpGetUser()
            .then((res) => setUser(res))
            .catch(() => {
                console.log('error api');
            });
    };
    useEffect(() => {
        apiGetUser();
    }, []);
    const apiCrop = async () => {
        listImage.forEach(async (element) => {
            const formData = new FormData();
            formData.append('fileCrop', element.fileCrop);
            formData.append('width', String(element.serverSize.width));
            formData.append('height', String(element.serverSize.height));
            formData.append('x', String(element.serverSize.x));
            formData.append('y', String(element.serverSize.y));
            const res = await httpCropImg(formData);
            console.log(res);
        });
    };
    useEffect(() => {
        let width = 520;
        let height = 520;
        const aspect = listImage[indexSlide].aspect;
        switch (aspect) {
            case '4/5':
                width *= 0.8;
                setSizeCrop({ height, width });
                break;
            case '16/9':
                height *= 0.5625;
                setSizeCrop({ height, width });
                break;
            case 'origin':
                getSize(listImage[indexSlide].fileCrop, (widthImg, heightImg) => {
                    if (heightImg > widthImg) {
                        let ratio = heightImg / widthImg;
                        width = height / ratio;
                        setSizeCrop({ height, width });
                    } else {
                        let ratio = widthImg / heightImg;
                        height = width / ratio;
                        setSizeCrop({ height, width });
                    }
                });
                break;
            default:
                setSizeCrop({ height, width });
                break;
        }
    }, [indexSlide, listImage]);
    return (
        <div>
            <HeadCreatePosts onPrev={() => onStep(3)} onNext={apiCrop} title="Tạo bài viết mới" />
            <div className="flex">
                <div className="w-[520px] h-[520px] bg-black/50 relative flex justify-center items-center">
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
                <div className="w-[340px]">
                    <div className="flex items-center p-4">
                        <Avatar
                            avatar={user.avatar}
                            name={user.fullName}
                            userName={user.userName}
                            classNames="w-7 h-7"
                        />
                        <UserName data={user} />
                    </div>
                    <div>
                        <textarea
                            onChange={(e) => {
                                if (e.target.value.length > 2200) return;
                                setDescription(e.target.value);
                            }}
                            value={description}
                            rows={10}
                            placeholder="Viết chú thích ..."
                            className="w-full resize-none px-4 py-1"
                        ></textarea>
                        <div className="flex justify-between px-4 text-second">
                            <SmileIcon color="rgb(115 115 115)" className="w-5 h-5" />
                            <p className="text-xs">{description.length}/2.200</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="flex items-center justify-between px-4 py-3 border-y border-solid border-[#ccc]">
                            <p>Cài đặt nâng cao</p>
                            <Icon icon="uiw:down" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreviewImg;
