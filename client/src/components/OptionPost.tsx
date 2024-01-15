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
                    <div className='bg-white w-96 rounded-xl flex flex-col'>
                        <Button type='text' className='py-3'>
                            Copy link
                        </Button>
                        <Button onClick={viewPosts} type='text' className='py-3 border-t'>
                            View posts
                        </Button>
                        <Button
                            onClick={changeOverlay(false)}
                            type='text'
                            className='border-t py-3 text-red-500 hover:text-red-600'
                        >
                            Cancel
                        </Button>
                    </div>
                </OverLay>
            )}
            <div onClick={changeOverlay(true)}>{children}</div>
        </div>
    )
}

export default OptionPost
