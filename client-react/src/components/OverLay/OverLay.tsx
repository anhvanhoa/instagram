import { useEffect } from 'react';
import CloseIcon from '~/components/Icon/CloseIcon';
interface Props {
    children: React.ReactNode;
    onClose?: () => void;
    iconClose?: boolean;
}
const OverLay = ({ children, onClose, iconClose }: Props) => {
    useEffect(() => {
        window.document.body.style.overflow = 'hidden';
        return () => {
            window.document.body.style.overflow = 'unset';
        };
    }, []);
    return (
        <section className="fixed inset-0 z-[100] flex items-center justify-center">
            {iconClose && (
                <div onClick={onClose} className="absolute top-4 right-4 text-white z-[111] cursor-pointer">
                    <CloseIcon />
                </div>
            )}
            <div className="absolute inset-0 bg-[#000000d6]" onClick={onClose}></div>
            <div className="z-[111]">{children}</div>
        </section>
    );
};

export default OverLay;
