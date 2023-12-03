import { Icon } from '@iconify/react';
import { memo } from 'react';
import { Link } from 'react-router-dom';

interface Props {
    error?: boolean;
}
const OtherLogin: React.FC<Props> = ({ error }) => {
    const handleLoginFB = () => {};
    return (
        <div>
            <div className="flex items-center mx-10 mt-3">
                <div className="h-[1px] bg-[#ccc] flex-1"></div>
                <p className="mx-4 uppercase text-xs font-medium text-second">hoặc</p>
                <div className="h-[1px] bg-[#ccc] flex-1"></div>
            </div>
            <div className="mx-11" onClick={handleLoginFB}>
                <div className="flex items-center justify-center mt-5 text-[#385185] cursor-pointer">
                    <div>
                        <Icon icon="uiw:facebook" />
                    </div>
                    <p className="pl-2 font-semibold text-sm">Đăng nhập bằng Facebook</p>
                </div>
            </div>
            {error && (
                <p className="text-red-600 text-center text-sm px-8 pt-2">
                    Rất tiếc, mật khẩu của bạn không đúng. Vui lòng kiểm tra lại mật khẩu.
                </p>
            )}
            <div className="cursor-pointer my-5">
                <Link to="/account/forgot-password" className="text-xs text-center block">
                    Quên mật khẩu?
                </Link>
            </div>
        </div>
    );
};

export default memo(OtherLogin);
