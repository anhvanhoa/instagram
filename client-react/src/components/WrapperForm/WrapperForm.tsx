import images from '~/assets/images';
import LoginSignup from '~/components/LoginSignup';
import { Link } from 'react-router-dom';
interface Props {
    isLogo?: boolean;
    isAccount: boolean;
    children: React.ReactNode;
    setIsAccount?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}
const WrapperForm: React.FC<Props> = ({ isLogo = true, children, isAccount, setIsAccount }) => {
    return (
        <section className="flex items-center justify-center min-h-full pb-11">
            <div className="max-w-[350px] w-[350px] mt-3 flex items-center flex-col justify-center">
                <div className="border border-[#d2d2d2] border-solid w-full">
                    {isLogo && (
                        <Link to="/" className="mt-9 mb-3 flex items-center flex-col justify-center">
                            <div className="w-[174px] h-[50px]">
                                <img src={images.logo} alt="logo" />
                            </div>
                        </Link>
                    )}
                    {children}
                </div>
                <LoginSignup setIsAccount={setIsAccount} isAccount={isAccount} />
                <div className="mt-3">
                    <div>
                        <p className="my-3 text-center text-sm">Tải ứng dụng.</p>
                    </div>
                    <div className="grid grid-cols-2 justify-center gap-3">
                        <div className="w-32 h-10">
                            <img className="rounded-lg" src={images.chPlay} alt="chPlay" />
                        </div>
                        <div className="w-32 h-10">
                            <img className="rounded-lg" src={images.microsoft} alt="microsoft" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WrapperForm;
