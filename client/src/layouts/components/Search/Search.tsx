import SearchInput from './SearchInput';
import AccountItem from '~/components/AccountItem/AccountItem';
import { useEffect, useState } from 'react';
import { User } from '~/types/auth';

const handleClose = () => {};
const Search = ({
    handleMouseDown,
    active,
    handleCloseMode,
}: {
    handleCloseMode: () => void;
    handleMouseDown: (event: MouseEvent) => void;
    active: boolean;
}) => {
    const [listUser, setListUser] = useState<User[]>([]);
    useEffect(() => {
        document.addEventListener('mousedown', handleMouseDown);
        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
        };
    }, [handleMouseDown]);
    return (
        <div
            className={`fixed top-0 left-small-sidebar max-h-screen w-[397px] bg-white rounded-tr-xl rounded-br-xl shadow-2xl border-r border-solid border-[#ccc]/80 py-2 flex flex-col z-50 transition-all -translate-x-[110%] h-screen ${
                active && 'translate-x-0'
            }`}
        >
            <h2 className="my-2 px-6 pt-3 pb-9 font-semibold text-2xl">Tìm kiếm</h2>
            <div className="overflow-hidden flex flex-col">
                <SearchInput setData={setListUser} />
                <div className="pt-3 overflow-auto scroll-smooth">
                    {listUser.length === 0 ? (
                        <>
                            <div className="flex items-center justify-between my-[6px] px-6">
                                <h3 className="font-semibold">Gần đây</h3>
                            </div>
                            <div className="mt-4 overflow-auto flex-1 text-center h-6">Không có dữ liệu</div>
                        </>
                    ) : (
                        <>
                            {listUser.map((element) => (
                                <div
                                    key={element._id}
                                    className="py-2 px-6 hover:bg-input/40"
                                    onClick={handleCloseMode}
                                >
                                    <AccountItem
                                        data={element}
                                        onClick={handleClose}
                                        to={element.userName}
                                        description={element.follower > 1000 ? 'number-follow' : 'name'}
                                    />
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Search;
