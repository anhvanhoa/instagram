import { Link } from 'react-router-dom';
import images from '~/assets/images';
import Button from '~/components/Button';
const HeaderNotAuth = () => {
    return (
        <div>
            <div className="border-b border-solid border-[#ccc]/50">
                <div className="max-w-[975px] mx-auto pt-4 pb-3 flex items-center justify-between">
                    <Link to="/">
                        <img src={images.logo} alt="logo" className="w-[103px] h-[29px]" />
                    </Link>
                    <div className="flex gap-4">
                        <Button className="bg-transparent text-black hover:bg-[#ccc]/30" to="/account/signup">
                            Đăng ký
                        </Button>
                        <Button to="/account/login">Đăng nhập</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderNotAuth;
