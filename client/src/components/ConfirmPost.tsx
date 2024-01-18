import React from 'react'
import images from '~/assets'
import IconApp from '~/assets/icons/IconApp'
interface Props {
    success: number
}
const ConfirmPost: React.FC<Props> = ({ success }) => {
    return (
        <div className='flex flex-col justify-center h-full'>
            <div className='flex flex-col  h-full'>
                <div className='flex justify-center items-center h-11 border-b border-[#ccc] border-solid'>
                    <h4 className='font-medium'>{success !== 5 ? 'Shared article' : 'Posts cannot be shared'}</h4>
                </div>
                {success !== 5 && (
                    <div className='flex items-center justify-center flex-col h-full gap-3'>
                        <img src={images.checkBg} alt='' className='w-20 h-20' />
                        <p className='text-xl'>Your post has been shared</p>
                    </div>
                )}
                {success === 5 && (
                    <div className='flex items-center justify-center flex-col h-full gap-3'>
                        <IconApp type='share-fail' className='w-20 h-20' />
                        <p className='text-xl'>Your post cannot be shared. Please try again.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ConfirmPost
