import Button from '~/components/Button';
import CheckIcon from '~/components/Icon/CheckIcon';
import TippyUser from '~/components/AccountItem/TippyUser';
import TippyHeadless from '@tippyjs/react/headless';
import { useState } from 'react';
import useFollow from '~/hooks/useFollow';
import { User } from '~/types/auth';
import ConfirmUnFollow from '~/components/ConfirmUnFollow';
import { memo } from 'react';

const UserName = ({ to, dropDow, data }: { to?: string; dropDow?: boolean; data: User }) => {
    const [overlay, setOverlay] = useState(false);
    const { apiCheckFollow, apiFollow, apiUnFollow, isFollow, loading } = useFollow();
    const handleCheckFollow = () => apiCheckFollow(data._id);
    return (
        <div>
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
            <TippyHeadless
                disabled={!dropDow}
                delay={[600, 100]}
                interactive
                placement="bottom-start"
                render={() => (
                    <TippyUser
                        onFollow={() => apiFollow(data._id)}
                        isFollow={isFollow}
                        onUnFollow={() => setOverlay(true)}
                        loading={loading}
                        data={data}
                    />
                )}
                onShow={handleCheckFollow}
            >
                <h2 className="flex items-center font-semibold">
                    <Button className="p-0 text-black block" text to={to}>
                        {data.userName}
                    </Button>
                    {data.verify && <CheckIcon className=" text-primary ml-1 mt-1" />}
                </h2>
            </TippyHeadless>
        </div>
    );
};

export default memo(UserName);
