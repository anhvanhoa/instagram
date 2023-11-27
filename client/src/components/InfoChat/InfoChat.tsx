import Button from '~/components/Button';

const InfoChat = () => {
    return (
        <div className="flex flex-col items-center my-8 gap-y-4">
            <div className="w-24 h-24 rounded-circle overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1497636577773-f1231844b336?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                    alt=""
                />
            </div>
            <div className="text-center">
                <p className="text-xl font-semibold">imduongg</p>
                <p className="text-sm text-second">thuyduongchannle · Instagram</p>
            </div>
            <Button to="/thuyduong" className="bg-[#EFEFEF] text-black hover:bg-[#DBDBDB]">
                Xem trang cá nhân
            </Button>
        </div>
    );
};

export default InfoChat;
