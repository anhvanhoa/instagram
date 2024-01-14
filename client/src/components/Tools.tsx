import TippyHeadLess from '@tippyjs/react/headless'
import Button from '~/components/Button'
import { Icon } from '@iconify/react'
import { memo } from 'react'
import IconApp from '~/assets/icons/IconApp'

const listAspect = [
    {
        title: '1:1',
        aspect: '1',
        icon: <IconApp type='ratio-horizontal' />,
    },
    {
        title: '4:5',
        aspect: '4/5',
        icon: <IconApp type='ratio-vertical' />,
    },
    {
        title: '16:9',
        aspect: '16/9',
        icon: <IconApp type='zoom' />,
    },
]

interface Props {
    onAspect: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
    valueRange: number
    onRange: (value: React.SetStateAction<number>) => void
}
const Tools = memo(({ onAspect, valueRange, onRange }: Props) => {
    return (
        <div className='flex items-center gap-3'>
            <>
                <TippyHeadLess
                    trigger='click'
                    placement='top-start'
                    interactive
                    render={() => (
                        <div className='bg-[#222]/90 text-white px-5 tracking-widest rounded-xl flex flex-col'>
                            {listAspect.map((item, index) => (
                                <div
                                    key={index}
                                    data-aspect={item.aspect}
                                    onMouseDown={onAspect}
                                    onMouseUp={onAspect}
                                    className='text-center text-white/80 cursor-pointer last:border-transparent border-b border-solid border-[#ccc] py-3'
                                >
                                    <p className='text-sm'>{item.title}</p>
                                </div>
                            ))}
                        </div>
                    )}
                >
                    <div className=''>
                        <Button
                            type='custom'
                            className='rounded-[50%] py-2 w-full cursor-pointer bg-[#222] hover:bg-[#222]/80 inline-block'
                        >
                            <IconApp className='h4 w-4 text-white' type='zoom' />
                        </Button>
                    </div>
                </TippyHeadLess>
            </>
            <>
                <TippyHeadLess
                    trigger='click'
                    placement='top-start'
                    interactive
                    render={() => (
                        <div className='absolute bottom-full bg-[#222]/80 flex items-center rounded-lg box-border py-4 px-3 w-32'>
                            <div
                                className='bg-white h-[2px] relative z-10'
                                style={{ width: `${(valueRange / 20) * 100}%` }}
                            >
                                <div className='w-4 h-4 bg-white rounded-[50%] absolute left-[85%] -translate-y-1/2 top-1/2 z-[-1] pointer-events-none'></div>
                            </div>
                            <input
                                type='range'
                                max={20}
                                min={0}
                                onChange={(e) => onRange(Number(e.target.value))}
                                value={valueRange}
                                className='appearance-none h-[2px] rounded-md cursor-pointer in-range:bg-black absolute inset-0 my-4 mx-3'
                            />
                        </div>
                    )}
                >
                    <div className=''>
                        <Button
                            type='custom'
                            className='w-full m-0 cursor-pointer bg-[#222222] hover:bg-[#222]/80 rounded-[50%] py-2 inline-block'
                        >
                            <Icon icon='codicon:zoom-in' className='text-white text-lg' />
                        </Button>
                    </div>
                </TippyHeadLess>
            </>
        </div>
    )
})

export default Tools
