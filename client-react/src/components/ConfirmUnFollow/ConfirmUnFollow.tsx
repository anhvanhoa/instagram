import OverLay from '~/components/OverLay';
import Button from '~/components/Button';
import images from '~/assets/images';

interface Props {
    onClose: () => void;
    onUnFollow: () => void;
    avatar: string;
    userName: string;
}

const ConfirmUnFollow = ({ onClose, onUnFollow, avatar, userName }: Props) => {
    return (
        <OverLay onClose={onClose}>
            <div className="flex flex-col bg-white rounded-xl">
                <div className="py-7 px-24 flex flex-col items-center gap-3 ab">
                    <img src={avatar || images.notAvatar} alt="" className="w-24 h-24" />
                    <p className="text-sm">Bỏ theo dõi @{userName}</p>
                </div>
                <Button
                    onClick={onUnFollow}
                    text
                    className="text-red-500 py-4 border-t border-solid border-[rgb(210,210,210)] rounded-none font-bold hover:text-red-500"
                >
                    Bỏ theo dõi
                </Button>
                <Button
                    onClick={onClose}
                    text
                    className="text-black font-normal py-4 border-t border-solid border-[rgb(210,210,210)] rounded-none"
                >
                    Hủy
                </Button>
            </div>
        </OverLay>
    );
};

export default ConfirmUnFollow;
