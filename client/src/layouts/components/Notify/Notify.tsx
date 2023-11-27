import { useEffect } from 'react';
import classNames from 'classnames';

const Notify = ({ handleMouseDown, active }: { handleMouseDown: (event: MouseEvent) => void; active: boolean }) => {
    useEffect(() => {
        document.addEventListener('mousedown', handleMouseDown);
        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div
            className={classNames(
                'fixed top-0 left-small-sidebar h-full w-[380px] bg-white rounded-tr-xl rounded-br-xl shadow-2xl py-2 transition-all z-50 border-r border-solid border-[#ccc]/80 -translate-x-[110%]',
                { 'translate-x-0': active },
            )}
        >
            <h2 className={classNames('pt-3 px-6 pb-6')}>Thông Báo</h2>
            <div className="">
                <h3 className={classNames('px-6 mb-[18px]')}>Tháng này</h3>
            </div>
            <div className="">
                <h3 className={classNames('px-6 mb-[18px]')}>Trước đó</h3>
            </div>
        </div>
    );
};

export default Notify;
