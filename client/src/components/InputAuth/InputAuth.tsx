import { ReactNode } from 'react';
import classNames from 'classnames';

interface Props {
    children: ReactNode;
    type: 'text' | 'number' | 'password';
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const InputAuth: React.FC<Props> = ({ children, type, value = '', onChange = () => {}, onBlur }) => {
    return (
        <div className="mx-10 mb-2">
            <label htmlFor="" className={classNames('relative flex items-center h-10 group', { isValue: value })}>
                <input
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    type={type}
                    className={classNames(
                        'w-full h-full border-[#d2d2d2] border-solid border py-2 px-2 rounded-md text-sm focus:border-second',
                        {
                            'pt-[14px] pb-[2px] text-xs isValue': value,
                        },
                    )}
                />
                <span className="group-[.isValue]:text-[10px] group-[.isValue]:top-0 group-[.isValue]:pt-1 absolute whitespace-nowrap text-xs py-2 px-2 pointer-events-none text-second transition-all duration-[50ms]">
                    {children}
                </span>
                <div></div>
            </label>
        </div>
    );
};

export default InputAuth;
