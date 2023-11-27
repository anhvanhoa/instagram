import { useEffect, useState } from 'react';
import images from '~/assets/images';
import SearchIcon from '~/components/Icon/SearchIcon';
import LoadIcon from '~/components/Icon/LoadIcon';
import { User } from '~/types/auth';
import httpSearch from '~/apis/httpSearch';
import useDebounce from '~/hooks/useDebounce';
const SearchInput = ({ setData }: { setData: (value: React.SetStateAction<User[]>) => void }) => {
    const [iconSearch, setIconSearch] = useState<boolean>(true);
    const [hideIcon, setHideIcon] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');
    const newValue = useDebounce(value, 500);
    const handleSearch = () => {
        setIconSearch(false);
    };
    const handleClear = () => {
        setValue('');
        setIconSearch(true);
    };
    useEffect(() => {
        const handleApi = (value: string) => {
            setHideIcon(true);
            httpSearch(encodeURIComponent(value))
                .then((res) => {
                    setData(res);
                    setHideIcon(false);
                })
                .catch(() => {});
        };
        handleApi(newValue);
    }, [newValue, setData]);
    const handleValue = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value);
    return (
        <div className="mx-4">
            <div className="mb-6 h-10 relative overflow-hidden rounded-md bg-input">
                {iconSearch || (
                    <input
                        autoFocus
                        type="text"
                        className="py-1 px-4 bg-input w-full h-full border-none z-10 text-black placeholder:font-thin"
                        placeholder="Tìm kiếm"
                        value={value}
                        onChange={handleValue}
                        onBlur={() => setTimeout(() => setIconSearch(true), 200)}
                    />
                )}
                {iconSearch && (
                    <div
                        className="absolute top-0 left-4 flex items-center w-full h-full text-[#909090] cursor-text"
                        onClick={handleSearch}
                    >
                        <span className="mt-[2px] mr-[10px]">
                            <SearchIcon color="#909090" />
                        </span>
                        <span className="font-thin text-[#909090] select-none">{value || 'Tìm kiếm'}</span>
                    </div>
                )}
                <div className="opacity-50 absolute right-4 top-1/2 w-4 h-4 -translate-y-1/2 block ">
                    {!iconSearch && !hideIcon && (
                        <img
                            className="cursor-pointer"
                            onClick={handleClear}
                            src={images.close_icon_bg}
                            alt="icon-close"
                        />
                    )}
                    {hideIcon && <LoadIcon color="#909090" />}
                </div>
            </div>
        </div>
    );
};

export default SearchInput;
