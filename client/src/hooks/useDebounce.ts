import { useEffect, useState } from 'react';

const useDebounce = (value: string, timer: number) => {
    const [data, setData] = useState<string>('');
    useEffect(() => {
        const timeID = setTimeout(() => {
            setData(value);
        }, timer);
        return () => clearTimeout(timeID);
    });
    return data;
};

export default useDebounce;
