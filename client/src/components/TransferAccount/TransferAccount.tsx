import Overlay from '~/components/OverLay';
import CloseIcon from '~/components/Icon/CloseIcon';
import Button from '../Button/Button';
import { Icon } from '@iconify/react';

interface Props {
    onClose: () => void;
}
const TransferAccount = ({ onClose }: Props) => {
    return (
        <Overlay onClose={onClose}>
            <div className="bg-white w-[400px] rounded-xl">
                <div className="flex items-center justify-between p-2 cursor-pointer border-b ">
                    <div></div>
                    <h3 className="font-semibold">Chuyển tài khoản</h3>
                    <div onClick={onClose}>
                        <CloseIcon className="p-2 w-8 h-8" />
                    </div>
                </div>
                <div className="min-h-[150px] max-h-[450px]">
                    <div className="flex items-center justify-between px-4 py-2 cursor-pointer">
                        <div className="flex items-center">
                            <div className="w-14 h-14 overflow-hidden rounded-circle">
                                <img
                                    src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                                    alt=""
                                />
                            </div>
                            <h4 className="pl-4 text-sm font-semibold">anhvanhoa.it</h4>
                        </div>
                        <span className="text-primary text-2xl">
                            <Icon icon="icon-park-solid:check-one" />
                        </span>
                    </div>
                </div>
                <div className="flex justify-center py-3 border-t">
                    <Button text>Đăng nhập vào tài khoản hiện có</Button>
                </div>
            </div>
        </Overlay>
    );
};

export default TransferAccount;
