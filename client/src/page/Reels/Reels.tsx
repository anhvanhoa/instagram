import CommentIcon from '~/components/Icon/CommentIcon';
import HeartIcon from '~/components/Icon/HeartIcon';
import SaveIcon from '~/components/Icon/SaveIcon';
import ShareIcon from '~/components/Icon/ShareIcon';
import { Icon } from '@iconify/react';

const Reels = () => {
    return (
        <main className="mx-auto pt-8 flex flex-col">
            <div className="flex items-center justify-center">
                <div className="flex items-end gap-x">
                    <div className="w-[370px] h-[659px] overflow-hidden rounded-lg relative">
                        <div className="w-full h-full">
                            <img
                                src="https://images.unsplash.com/photo-1685287919394-d5b4cb4c27d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                                alt=""
                            />
                        </div>
                        <div className="absolute right-4 top-4 text-white bg-[#ffffff30] p-2 rounded-circle">
                            {/* <Icon icon="clarity:volume-mute-solid" /> */}
                            <Icon icon="clarity:volume-up-solid" />
                        </div>
                        <div>
                            <div>
                                <img src="" alt="" />
                                <p>anhvanhoa</p>
                            </div>
                        </div>
                    </div>
                    <div className="ml-3 mb-1 w-[60px] flex flex-col gap-y-6 items-center">
                        <div className="flex flex-col items-center">
                            <HeartIcon />
                            <span className="text-xs">5.000</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <CommentIcon />
                            <span className="text-xs">21</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <ShareIcon />
                        </div>
                        <div className="flex flex-col items-center">
                            <SaveIcon />
                        </div>
                        <div className="flex flex-col items-center">
                            <Icon icon="solar:menu-dots-bold" />
                        </div>
                        <div className="w-6 h-6">
                            <img
                                src="https://images.unsplash.com/photo-1682687219612-b12805df750d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                                alt=""
                                className="rounded-sm"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-4"></div>
            <div className="flex items-center justify-center">
                <div className="flex items-end gap-x">
                    <div className="w-[370px] h-[659px] overflow-hidden rounded-lg ">
                        <img
                            src="https://images.unsplash.com/photo-1685287919394-d5b4cb4c27d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                            alt=""
                        />
                    </div>
                    <div className="ml-3 mb-1 w-[60px] flex flex-col gap-y-6 items-center">
                        <div className="flex flex-col items-center">
                            <HeartIcon />
                            <span className="text-xs">5.000</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <CommentIcon />
                            <span className="text-xs">21</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <ShareIcon />
                        </div>
                        <div className="flex flex-col items-center">
                            <SaveIcon />
                        </div>
                        <div className="flex flex-col items-center">
                            <Icon icon="solar:menu-dots-bold" />
                        </div>
                        <div className="w-6 h-6">
                            <img
                                src="https://images.unsplash.com/photo-1682687219612-b12805df750d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                                alt=""
                                className="rounded-sm"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-4"></div>
        </main>
    );
};

export default Reels;
