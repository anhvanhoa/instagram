import React, { useRef } from 'react'
import IconApp from '~/assets/icons/IconApp'
import Button from './Button'
import Tippy from '@tippyjs/react/headless'
import Emoij from './Emoij'
interface Props {
    value: string
    setValue: (value: React.SetStateAction<string>) => void
    onSend: () => void
}
const InputChat: React.FC<Props> = ({ value, setValue, onSend }) => {
    const refInput = useRef<HTMLInputElement>(null)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)
    const changeEmoij = (value: string) => setValue((prev) => `${prev}${value}`)
    return (
        <div className='m-2'>
            <div className='flex items-center p-2 sm:p-3 border border-second rounded-3xl'>
                <div className='pt-[2px] relative cursor-pointer'>
                    <Tippy
                        onClickOutside={() => refInput.current?.focus()}
                        interactive
                        trigger='click'
                        placement={'top-start'}
                        render={() => <Emoij onSelect={changeEmoij} />}
                    >
                        <div>
                            <IconApp className='w-5 block fill-white' type='smile' />
                        </div>
                    </Tippy>
                </div>
                <div className='flex-1 ml-3'>
                    <input
                        ref={refInput}
                        autoFocus
                        value={value}
                        onChange={handleChange}
                        type='text'
                        placeholder='Chat...'
                        className='w-full outline-none bg-transparent'
                    />
                </div>
                {value && (
                    <Button onClick={onSend} type='text'>
                        <p className='-my-1.5'>Send</p>
                    </Button>
                )}
                {!value && (
                    <div className='flex items-center gap-x-3'>
                        <span className='cursor-pointer hidden'>
                            <IconApp className='w-5' type='micro' />
                        </span>
                        <label htmlFor='img' className='cursor-pointer'>
                            <input id='img' type='file' hidden />
                            <IconApp className='w-5' type='picture' />
                        </label>
                    </div>
                )}
            </div>
        </div>
    )
}

export default InputChat
