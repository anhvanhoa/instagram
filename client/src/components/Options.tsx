import classNames from 'classnames'
import useAuth from '~/hooks/useAuth'
import HeaderOption from './HeaderOption'
import Button from './Button'
import { Icon } from '@iconify/react/dist/iconify.js'
import { UserBase } from '~/types/auth'
import { OptionCommon } from '~/types/options'

type Option<Data, HandleName> = {
    data?: Array<OptionCommon<HandleName, Data>>
    handleName: HandleName
    title?: string
    subtitle?: string
    element?: React.FC<any>
}

type Props<Data, HandleName, PropsElement> = {
    CurentOption: Option<Data, HandleName>
    author: UserBase
    isShowTypeHidden?: boolean
    postId?: string
    propsElement?: PropsElement
    onBack?: () => void
    handleClick: (
        name: HandleName,
        data?: {
            title?: string
            subtitle?: string
            data?: Data[]
            handleName: HandleName
            element?: React.FC<PropsElement>
        },
    ) => () => void
}

function Options<Data, HandleName, PropsElement>({
    CurentOption,
    author,
    isShowTypeHidden,
    postId = '',
    handleClick,
    propsElement,
    onBack,
}: Props<Data, HandleName, PropsElement>) {
    const { user } = useAuth()
    return (
        <>
            {CurentOption?.element && (
                <div>
                    <CurentOption.element {...propsElement} />
                </div>
            )}
            {CurentOption.title && (
                <HeaderOption
                    subtitle={CurentOption.subtitle}
                    isSticky
                    title={CurentOption.title}
                    onBack={onBack}
                />
            )}
            {CurentOption.data?.map((option) => {
                // isHidden = true => xóa element
                const hidden =
                    // + Hiển thị khi đây là bài post của tài khoản đang đăng nhập
                    (author._id === user._id && option.type === 'me') ||
                    // + Hiển thị khi đây là bài post của tài khoản khác
                    (author._id !== user._id && option.type === 'other') ||
                    // + Hiển thị khi isViewPost = true
                    (option.type === 'hidden' && isShowTypeHidden) ||
                    // + Luôn hiển thị khi là normalnormal
                    option.type === 'normal'
                return (
                    <div key={option.id} className='last:border-none'>
                        <Button
                            to={option.to && `${option.to}${postId}`}
                            isStopPropagation={option.isStopPropagation}
                            onClick={handleClick(option.handleName, {
                                data: option.children?.data,
                                subtitle: option.children?.subtitle,
                                title: option.children?.title,
                                handleName: option.handleName,
                                element: option.element,
                            })}
                            iconR={
                                option.icon?.place === 'right' && (
                                    <Icon
                                        icon={option.icon?.name ?? ''}
                                        className='p-1'
                                    />
                                )
                            }
                            iconL={
                                option.icon?.place === 'left' && (
                                    <Icon
                                        icon={option.icon?.name ?? ''}
                                        className='size-6 mr-2'
                                    />
                                )
                            }
                            isHidden={!hidden}
                            type='block'
                            className={classNames(
                                'py-3 border-b font-normal px-4',
                                option.classname,
                                {
                                    'justify-between': option.icon?.place === 'right',
                                    '!justify-start': option.icon?.place === 'left',
                                },
                            )}
                        >
                            {option.title}
                        </Button>
                    </div>
                )
            })}
        </>
    )
}

export default Options
