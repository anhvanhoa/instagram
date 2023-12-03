import { memo } from 'react';
interface Props {
    children?: string;
    data: number[];
    valueDefault: number;
    setValue: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
const Select = ({ data, setValue, children, valueDefault }: Props) => {
    return (
        <div>
            <select
                defaultValue={valueDefault}
                onChange={setValue}
                className="text-xs py-2 px-1 rounded-sm text-second border border-solid border-[#ccc]/50"
            >
                {data.map((element) => (
                    <option key={element} value={element}>
                        {children} {element}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default memo(Select);
