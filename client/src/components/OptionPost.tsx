import React, { useState } from 'react'
import OverLay from './OverLay'
import Button from './Button'
interface Props {
    children: React.ReactNode
    viewPosts?: () => void
}
const OptionPost: React.FC<Props> = ({ children, viewPosts }) => {
    const [overlay, setOverlay] = useState<boolean>(false)
    const changeOverlay = (isOvelay: boolean) => () => setOverlay(isOvelay)
    return (
        <div>
            {overlay && (
                <OverLay onClose={changeOverlay(false)}>
                    <div className='min-w-[320px] px-8 xs:px-0 border border-second rounded-xl'>
                        <div className='bg-main xs:w-96 rounded-xl flex flex-col'>
                            <Button type='text' className='py-3'>
                                Copy link
                            </Button>
                            <Button onClick={viewPosts} type='text' className='py-3 border-t border-second'>
                                View posts
                            </Button>
                            <Button
                                onClick={changeOverlay(false)}
                                type='text'
                                className='border-t border-second py-3 text-red-500 hover:text-red-600'
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </OverLay>
            )}
            <div onClick={changeOverlay(true)}>{children}</div>
        </div>
    )
}

export default OptionPost
