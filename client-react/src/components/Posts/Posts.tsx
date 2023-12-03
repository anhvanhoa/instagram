import CheckIcon from '~/components/Icon/CheckIcon';
import { Icon } from '@iconify/react';
import CommentIcon from '~/components/Icon/CommentIcon';
import HeartIcon from '~/components/Icon/HeartIcon';
import ShareIcon from '~/components/Icon/ShareIcon';
import SaveIcon from '~/components/Icon/SaveIcon';
import SmileIcon from '~/components/Icon/SmileIcon';
import Button from '~/components/Button';
import { Posts as TypePosts } from '~/types/posts';
import images from '~/assets/images';
import HeartColor from '~/components/Icon/HeartColor';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AccountItem from '~/components/AccountItem';
import OverLay from '../OverLay';
import UserName from '~/components/UserName';

const Posts = ({ author, comments, contents, description, likes, tags }: TypePosts) => {
    const [like, setLike] = useState<boolean>(false);
    const [overlay, setOverlay] = useState<boolean>(false);

    return (
        <div className="my-4 bg-white mb-6 pb-4 border-b border-[#ccc]/50 border-solid">
            {overlay && (
                <OverLay onClose={() => setOverlay(false)}>
                    <div className="bg-white w-96 rounded-xl flex flex-col">
                        <Button text className="font-bold text-red-500 py-4 hover:text-red-500">
                            Báo cáo
                        </Button>
                        <Button
                            text
                            className="font-normal text-black py-4 border-t border-[#ccc] border-solid rounded-none"
                        >
                            Sao chép liên kết
                        </Button>
                        <Button
                            text
                            className="font-normal text-black py-4 border-t border-[#ccc] border-solid rounded-none"
                        >
                            Nhúng
                        </Button>
                        <Button
                            text
                            className="font-normal text-black py-4 border-t border-[#ccc] border-solid rounded-none"
                        >
                            Hủy
                        </Button>
                    </div>
                </OverLay>
            )}
            <div className="px-1 pb-3 flex justify-between items-center">
                <AccountItem data={author} sizeAvatar="small" dropDow description="5 minute" />
                <Icon icon="solar:menu-dots-bold" className="cursor-pointer" onClick={() => setOverlay(true)} />
            </div>
            <div className="relative">
                <div
                    className="rounded-md overflow-hidden"
                    onDoubleClick={() => {
                        setLike(true);
                    }}
                >
                    {contents.map((element, index) => (
                        <img key={index} src={element} alt="" />
                    ))}
                </div>
                <div className="absolute top-0 hidden">
                    <Icon icon="clarity:volume-mute-solid" />
                    <Icon icon="clarity:volume-up-solid" />
                </div>
            </div>
            <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-4">
                    <span
                        className=""
                        onClick={() => {
                            setLike((pre) => (pre ? false : true));
                        }}
                    >
                        {like ? <HeartColor /> : <HeartIcon />}
                    </span>
                    <span className="">
                        <CommentIcon />
                    </span>
                    <span className="">
                        <ShareIcon />
                    </span>
                </div>
                <div className="flex items-center">
                    <span className="">
                        <SaveIcon />
                    </span>
                </div>
            </div>
            <div className="mt-3">
                <div className="mb-2">
                    <p className="text-sm font-semibold">{likes.count} lượt thích</p>
                </div>
                <div className="text-sm mb-2">
                    <div className="inline-block pr-1">
                        <UserName data={author} dropDow to={author.userName} />
                    </div>
                    <span>{description}</span>
                    <p className="text-[#737373]">xem thêm</p>
                </div>
                <div className="mb-2">
                    <p className="text-[#737373] text-sm">Xem tất cả 122 bình luận</p>
                </div>
            </div>
            <div>
                <div className="flex gap-x-3 items-center justify-between">
                    <div className="flex-1">
                        <input className="text-sm w-full" type="text" placeholder="Thêm bình luận" />
                    </div>
                    <div>
                        <span className="mt-[1px]">
                            <SmileIcon className="w-3 h-3" color="gray" />
                        </span>
                        <Button disable text className="hidden">
                            Đăng
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Posts;
