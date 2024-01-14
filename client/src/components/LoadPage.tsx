import images from '~/assets'

const LoadPage = () => {
    return (
        <div className='absolute inset-0 z-[1000] justify-center items-center bg-white flex animate-hidden'>
            <img className='w-16 h-16' src={images.logoIconRgb} alt='' />
            <div className='absolute bottom-9 text-primary'>Form Ánh Văn Hóa</div>
        </div>
    )
}

export default LoadPage
