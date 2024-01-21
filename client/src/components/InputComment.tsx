import React from 'react'
import Button from './Button'
import Tippy from '@tippyjs/react/headless'
import IconApp from '~/assets/icons/IconApp'
import Emoij from './Emoij'
interface Props {
    comment: string
    setComment: (value: React.SetStateAction<string>) => void
    apiComment: () => void
    positionSmile: 'left' | 'right'
}

const InputComment: React.FC<Props> = ({ comment, setComment, apiComment, positionSmile = 'left' }) => {
    const changeComment = (event: React.ChangeEvent<HTMLInputElement>) => setComment(event.target.value)
    const changeEmoij = (value: string) => setComment((prev) => `${prev}${value}`)
    return (
        <div>
            <div className='px-2'>
                <div className='flex gap-x-3 items-center justify-between h-7'>
                    {positionSmile === 'left' && (
                        <div>
                            <Tippy
                                interactive
                                trigger='click'
                                placement={'top-end'}
                                render={() => <Emoij onSelect={changeEmoij}></Emoij>}
                            >
                                <div className='mt-[1px] cursor-pointer transition-all w-6 hover:scale-110'>
                                    <IconApp type='smile' className='w-5 h-5' />
                                </div>
                            </Tippy>
                        </div>
                    )}
                    <div className='flex-1'>
                        <input
                            value={comment}
                            onChange={changeComment}
                            className='text-sm w-full outline-none'
                            type='text'
                            placeholder='Add a comment'
                        />
                    </div>
                    <div className='flex items-center'>
                        {comment && (
                            <Button onClick={apiComment} disable={!comment} type='text'>
                                Post
                            </Button>
                        )}
                        {positionSmile === 'right' && (
                            <Tippy
                                zIndex={999}
                                interactive
                                trigger='click'
                                placement={'top-end'}
                                render={() => <Emoij height={200} onSelect={changeEmoij}></Emoij>}
                            >
                                <div className='mt-[1px] cursor-pointer transition-all w-6 hover:scale-110'>
                                    <IconApp type='smile' className='w-5 h-5' />
                                </div>
                            </Tippy>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InputComment
