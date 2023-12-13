import images from '~/assets'

const LoadPage = () => {
    return (
        <div className='inset-0 z-50 fixed flex justify-center items-center'>
            <img className='w-16 h-16' src={images.logoIconRgb} alt='' />
            <div className='absolute bottom-9 text-xl font-medium text-primary'>Form Ánh Văn Hóa</div>
        </div>
    )
}

export default LoadPage
