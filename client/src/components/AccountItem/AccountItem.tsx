import CloseIcon from '~/components/Icon/CloseIcon';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { User } from '~/types/auth';
import { Icon } from '@iconify/react';
import TippyHeadless from '@tippyjs/react/headless';
import TippyUser from './TippyUser';
import Button from '../Button';
import Avatar from '~/components/Avatar';
import UserName from '../UserName';
import useFollow from '~/hooks/useFollow';
import ConfirmUnFollow from '~/components/ConfirmUnFollow';

interface Props {
    to?: string;
    description?: 'suggest' | 'number-follow' | 'name' | string;
    story?: boolean;
    viewStory?: boolean;
    textBtn?: 'view' | 'follow' | 'close' | 'follow-bg';
    dropDow?: boolean;
    sizeAvatar?: 'small' | 'extra' | 'medium';
    data: User;
    onClick?: () => void;
}

const AccountItem = ({
    to,
    data,
    story,
    viewStory,
    textBtn,
    dropDow,
    onClick,
    description = 'name',
    sizeAvatar,
}: Props) => {
    let Component: string | typeof Link = 'div';
    const [overlay, setOverlay] = useState<boolean>(false);
    if (to) {
        Component = Link;
    }
    const { apiCheckFollow, apiFollow, apiUnFollow, isFollow, loading } = useFollow();
    const handleCheckFollow = () => apiCheckFollow(data._id);
    return (
        <Component className={'flex items-center justify-between'} to={`/${data.userName}`}>
            {overlay && (
                <ConfirmUnFollow
                    avatar={data.avatar}
                    onClose={() => setOverlay(false)}
                    onUnFollow={() => {
                        apiUnFollow(data._id);
                        setOverlay(false);
                    }}
                    userName={data.userName}
                />
            )}
            <div className=" flex items-center">
                <TippyHeadless
                    disabled={!dropDow}
                    delay={[600, 100]}
                    interactive
                    placement="bottom-start"
                    render={() => (
                        <TippyUser
                            data={data}
                            isFollow={isFollow}
                            loading={loading}
                            onFollow={() => apiFollow(data._id)}
                            onUnFollow={() => setOverlay(true)}
                        />
                    )}
                    onShow={handleCheckFollow}
                >
                    <div>
                        <Avatar
                            avatar={data.avatar}
                            name={data.fullName}
                            userName={data.userName}
                            size={sizeAvatar}
                            to={Component !== Link ? data.userName : ''}
                        />
                    </div>
                </TippyHeadless>
                <div className="pr-3 flex-1 flex flex-col overflow-hidden">
                    <UserName to={data.userName} data={data} dropDow={dropDow} />
                    <p className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                        <span className=" text-second">
                            {description === 'name' && <span className="text-sm">{data.fullName}</span>}
                            {description === 'number-follow' && (
                                <span className="text-sm">
                                    {data.fullName} • {data.follower}
                                </span>
                            )}
                            {description === 'suggest' && <span className="text-xs">Gợi ý cho bạn</span>}
                            {description !== 'suggest' && description !== 'name' && description !== 'number-follow' && (
                                <span className="text-xs">{description}</span>
                            )}
                        </span>
                    </p>
                </div>
            </div>
            <div>
                {textBtn === 'view' && (
                    <Button className="hover:text-primary px-0" text to={data.userName}>
                        Xem
                    </Button>
                )}
                {textBtn === 'close' && <CloseIcon onClick={onClick} className="cursor-pointer hover:text-red-500" />}
                {(textBtn === 'follow' || textBtn === 'follow-bg') && (
                    <Button
                        onClick={() => {
                            isFollow ? setOverlay(true) : apiFollow(data._id);
                        }}
                        className={`px-0 text-xs ${isFollow && 'text-gray-500 hover:text-gray-500'}`}
                        text={textBtn === 'follow'}
                        leftIcon={loading && <Icon icon="nonicons:loading-16" className="animate-spin text-black" />}
                    >
                        {!loading && <>{isFollow ? 'Đang theo dõi' : 'Theo dõi'}</>}
                    </Button>
                )}
            </div>
        </Component>
    );
};

export default AccountItem;
