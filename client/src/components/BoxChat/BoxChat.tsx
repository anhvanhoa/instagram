import CallIcon from '~/components/Icon/CallIcon';
import CallVideoIcon from '~/components/Icon/CallVideoIcon';
import InfoIcon from '~/components/Icon/InfoIcon';
import SmileIcon from '~/components/Icon/SmileIcon';
import MiroIcon from '~/components/Icon/MiroIcon';
import PictureIcon from '~/components/Icon/PictureIcon';
import HeartIcon from '~/components/Icon/HeartIcon';
import InfoChat from '~/components/InfoChat';

const BoxChat = () => {
    return (
        <section className="h-screen flex flex-col justify-between">
            <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center">
                    <div className="w-11 h-11 rounded-circle overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1507133750040-4a8f57021571?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                            alt=""
                        />
                    </div>
                    <div className="ml-3">
                        <p className="font-semibold">imduongg</p>
                        <p className="text-xs text-second mt-1">Hoạt động 20 giờ trước</p>
                    </div>
                </div>
                <div className="flex items-center gap-x-4">
                    <span className="cursor-pointer">
                        <CallIcon />
                    </span>
                    <span className="cursor-pointer">
                        <CallVideoIcon />
                    </span>
                    <span className="cursor-pointer">
                        <InfoIcon />
                    </span>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto">
                <InfoChat />
            </div>
            <div>
                <div className="m-4">
                    <div className="flex items-center p-3 border rounded-3xl">
                        <div className="pt-[2px]">
                            <SmileIcon />
                        </div>
                        <div className="flex-1 ml-3">
                            <input type="text" placeholder="Nhắn tin..." className="w-full" />
                        </div>
                        <div className="flex items-center gap-x-3">
                            <span className="cursor-pointer">
                                <MiroIcon />
                            </span>
                            <span className="cursor-pointer">
                                <PictureIcon />
                            </span>
                            <span className="cursor-pointer">
                                <HeartIcon />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BoxChat;
