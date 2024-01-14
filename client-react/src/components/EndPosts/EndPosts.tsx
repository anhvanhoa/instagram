import Button from '../Button/Button';
import images from '~/assets/images';

const EndPosts = () => {
    return (
        <div className='py-8 px-3 my-6 border-b border-solid flex items-center flex-col'>
            <div className='w-24 h-24'>
                <img src={images.check_bg} alt='' />
            </div>
            <p className='text-xl pt-2'>Bạn đã xem hết tin</p>
            <p className='text-sm text-[#737373]'>
                Bạn đã xem hết các bài viết mới từ 3 ngày qua.
            </p>
            <Button text>Xem bài viết cũ hơn</Button>
        </div>
    );
};

export default EndPosts;
