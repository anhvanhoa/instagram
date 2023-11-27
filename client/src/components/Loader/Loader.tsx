import { useEffect, useState } from 'react';
import images from '~/assets/images';
const Loader = () => {
    const [loader, setLoader] = useState<boolean>(true);
    useEffect(() => {
        setTimeout(() => {
            setLoader(false);
        }, 1000);
    }, []);
    return (
        <div>
            {loader && (
                <div className="inset-0 bg-white z-[100] flex items-center justify-center fixed top-0">
                    <img className="w-16 h-16" src={images.logoLoader} alt="" />
                    <div className="absolute bottom-9 text-xl font-medium text-primary">Form Ánh Văn Hóa</div>
                </div>
            )}
        </div>
    );
};

export default Loader;
