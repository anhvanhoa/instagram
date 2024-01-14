import classnames from 'classnames'
import { Icon } from '@iconify/react'
type InputType = 'text' | 'number' | 'password'
interface Props {
    children: string
    type: InputType
    value?: string
    isSuccess?: boolean
    isError?: boolean
    maxLength?: number
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onFocus?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const InputAuth: React.FC<Props> = ({
    children,
    type,
    value = '',
    isSuccess,
    isError,
    maxLength,
    onChange,
    onBlur,
    onFocus,
}) => {
    return (
        <div className='mx-10 mb-2'>
            <label className={classnames('relative flex items-center h-10 overflow-hidden group', { isValue: value })}>
                <input
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    type={type}
                    maxLength={maxLength}
                    className={classnames(
                        'w-full h-full border-[#d2d2d2] border-solid border rounded-md',
                        'py-2 px-2 text-sm outline-none focus:border-gray-400',
                        { 'pt-[14px] pb-[2px] text-xs isValue': value },
                    )}
                />
                <span
                    className={classnames(
                        'group-[.isValue]:text-[10px] group-[.isValue]:top-0 group-[.isValue]:pt-1 whitespace-nowrap',
                        'text-xs py-2 px-2 pointer-events-none text-gray-500 transition-all duration-[50ms] absolute',
                    )}
                >
                    {children}
                </span>
                {isSuccess && <Icon className='absolute right-2 w-6 text-green-700' icon='ei:check' />}
                {isError && <Icon className='absolute right-2 w-6 text-red-700' icon='ei:close-o' />}
                <div></div>
            </label>
        </div>
    )
}

export default InputAuth
