import { memo } from 'react';
import { Link } from 'react-router-dom';
import images from '~/assets/images';
interface Props {
    handleCloseMode: () => void;
    sidebar: boolean;
}
const Logo = ({ handleCloseMode, sidebar }: Props) => {
    return (
        <div className="h-[73px] px-3 pt-7 pb-4 mb-5 " title="instagram-clone">
            <Link to="/" onClick={handleCloseMode} className={`relative flex`}>
                {sidebar && (
                    <div className="w-6 h-6 flex-shrink-0 absolute left-0 top-0">
                        <img src={images.logo_icon} alt="logo" />
                    </div>
                )}
                {!sidebar && (
                    <div className="w-[103px] h-[29px] flex-shrink-0">
                        <img src={images.logo} alt="logo" />
                    </div>
                )}
            </Link>
        </div>
    );
};

export default memo(Logo);
