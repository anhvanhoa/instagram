type Props = {
    children: React.ReactNode
}
const Toast = ({ children }: Props) => {
    return (
        <div>
            <div className='select-none text-white px-4 py-3 w-full rounded-t-sm'>
                {children}
            </div>
        </div>
    )
}

export default Toast
