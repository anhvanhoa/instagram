import images from '~/assets/images';

const ConfirmPost = () => {
    return (
        <div className="flex flex-col justify-center h-full">
            <div className="flex flex-col  h-full">
                <div className="flex justify-center items-center h-11 border-b border-[#ccc] border-solid">
                    <h4 className="font-medium">{false ? 'Đã chia sẻ bài viết' : 'Không thể chia sẻ bài viết'}</h4>
                </div>
                {false && (
                    <div className="flex items-center justify-center flex-col h-full gap-3">
                        <img src={images.sharePosts} alt="" className="w-20 h-20" />
                        <p className="text-xl">Đã chia sẻ bài viết của bạn</p>
                    </div>
                )}
                {true && (
                    <div className="flex items-center justify-center flex-col h-full gap-3">
                        <img src={images.notSharePosts} alt="" className="w-20 h-20" />
                        <p className="text-xl">Không thể chia sẻ bài viết của bạn. Vui lòng thử lại.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConfirmPost;
