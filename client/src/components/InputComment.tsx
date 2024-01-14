import React from 'react'
import Button from './Button'
import Tippy from '@tippyjs/react/headless'
import IconApp from '~/assets/icons/IconApp'
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
interface Props {
    comment: string
    setComment: (value: React.SetStateAction<string>) => void
    apiComment: () => void
    positionSmile: 'left' | 'right'
}
const InputComment: React.FC<Props> = ({ comment, setComment, apiComment, positionSmile = 'left' }) => {
    const channgeComment = (event: React.ChangeEvent<HTMLInputElement>) => setComment(event.target.value)
    return (
        <div>
            <div>
                <div className='flex gap-x-3 items-center justify-between h-7'>
                    {positionSmile === 'left' && (
                        <div>
                            <Tippy
                                interactive
                                trigger='click'
                                placement={'top-end'}
                                render={() => (
                                    <div>
                                        <Picker
                                            skinTonePosition={'none'}
                                            locale='vi'
                                            perLine={10}
                                            maxFrequentRows={0}
                                            previewPosition={'none'}
                                            navPosition={'none'}
                                            searchPosition={'none'}
                                            theme={'light'}
                                            categories={['people']}
                                            icons={'outline'}
                                            data={data}
                                            onEmojiSelect={(e: { native: string }) =>
                                                setComment((prev) => `${prev}${e.native}`)
                                            }
                                        />
                                    </div>
                                )}
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
                            onChange={channgeComment}
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
                                render={() => (
                                    <div>
                                        <Picker
                                            skinTonePosition={'none'}
                                            locale='vi'
                                            perLine={10}
                                            maxFrequentRows={0}
                                            previewPosition={'none'}
                                            navPosition={'none'}
                                            searchPosition={'none'}
                                            theme={'light'}
                                            categories={['people']}
                                            icons={'outline'}
                                            data={data}
                                            onEmojiSelect={(e: { native: string }) =>
                                                setComment((prev) => `${prev}${e.native}`)
                                            }
                                        />
                                    </div>
                                )}
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
