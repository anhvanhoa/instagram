import React from 'react'
import Button from './Button'
import Tippy from '@tippyjs/react/headless'
import IconApp from '~/assets/icons/IconApp'
import Emoij from './Emoij'
interface Props {
    comment: string
    setComment: (value: string) => void
    handleComment: () => void
    positionSmile: 'left' | 'right'
    loading?: boolean
}

const InputComment: React.FC<Props> = ({
    comment,
    setComment,
    handleComment,
    positionSmile = 'left',
    loading = false,
}) => {
    const changeComment = (event: React.ChangeEvent<HTMLInputElement>) =>
        setComment(event.target.value)
    const changeEmoij = (value: string) => setComment(`${comment}${value}`)
    return (
        <div>
            <div className='px-2'>
                <div className='flex gap-x-3 items-center justify-between h-7'>
                    {positionSmile === 'left' && (
                        <div>
                            <Tippy
                                interactive
                                trigger='click'
                                placement={'top-start'}
                                render={() => <Emoij onSelect={changeEmoij}></Emoij>}
                            >
                                <div className='mt-[1px] cursor-pointer transition-all w-6 hover:scale-110'>
                                    <IconApp
                                        type='smile'
                                        className='w-5 h-5 fill-white'
                                    />
                                </div>
                            </Tippy>
                        </div>
                    )}
                    <div className='flex-1'>
                        <input
                            id='comment'
                            value={comment}
                            onChange={changeComment}
                            className='text-sm w-full outline-none bg-transparent'
                            type='text'
                            placeholder='Add a comment'
                        />
                    </div>
                    <div className='flex items-center'>
                        {comment && (
                            <Button
                                onClick={handleComment}
                                disable={!comment}
                                type='text'
                                loading={loading}
                            >
                                Post
                            </Button>
                        )}
                        {positionSmile === 'right' && (
                            <Tippy
                                zIndex={999}
                                interactive
                                trigger='click'
                                placement={'top-end'}
                                render={() => (
                                    <Emoij height={200} onSelect={changeEmoij}></Emoij>
                                )}
                            >
                                <div className='mt-[1px] cursor-pointer transition-all w-6 hover:scale-110 ml-1'>
                                    <IconApp
                                        type='smile'
                                        className='w-5 h-5 dark:fill-white'
                                    />
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
