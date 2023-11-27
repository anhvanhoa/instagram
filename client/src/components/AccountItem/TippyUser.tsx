import Wrapper from '~/components/Wrapper';
import { User } from '~/types/auth';
import Button from '~/components/Button';
import { Icon } from '@iconify/react';
import images from '~/assets/images';
import MessageIcon from '../Icon/MessageIcon';
import { Link } from 'react-router-dom';

interface Props {
    data: User;
    isFollow: boolean;
    loading: boolean;
    onFollow: () => void;
    onUnFollow: () => void;
}
const TippyUser = ({ data, onFollow, onUnFollow, isFollow, loading }: Props) => {
    return (
        <Wrapper>
            <div className="bg-white w-[350px] rounded-xl">
                <div className="flex items-center p-4">
                    <img className="w-12 h-12 rounded-circle" src={data.avatar || images.notAvatar} alt="" />
                    <div className="pl-4">
                        <h4 className="font-bold">{data.userName}</h4>
                        <p className="text-second text-sm">{data.fullName}</p>
                    </div>
                </div>
                <div className="flex items-center justify-between mb-4 mx-5 text-sm">
                    <div className="text-center">
                        <p className="font-bold">{data.posts}</p>
                        <p>bài viết</p>
                    </div>
                    <div className="text-center">
                        <p className="font-bold">{data.follower}</p>
                        <p>người theo dọi</p>
                    </div>
                    <div className="text-center">
                        <p className="font-bold">{data.following}</p>
                        <p>đang theo dõi</p>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-1">
                    {data.listPosts.map((element) => (
                        <Link to="/" className="aspect-square">
                            <img src={element} alt="" />
                        </Link>
                    ))}
                </div>
                <div className="p-3">
                    {!isFollow && (
                        <Button
                            onClick={onFollow}
                            leftIcon={
                                loading && <Icon icon="nonicons:loading-16" className="animate-spin text-white" />
                            }
                            className="w-full"
                        >
                            {!loading && <>{!isFollow && 'Theo dõi'}</>}
                        </Button>
                    )}
                    {isFollow && (
                        <div className="flex items-center gap-4">
                            <Button leftIcon={<MessageIcon />} className="w-full">
                                Nhắn tin
                            </Button>
                            <Button
                                onClick={onUnFollow}
                                text={isFollow}
                                className="w-full bg-[#efefef] text-black hover:bg-[#dbdbdb]"
                            >
                                Đang theo dõi
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </Wrapper>
    );
};

export default TippyUser;
