/* eslint-disable react-hooks/exhaustive-deps */
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AccountChat from '~/components/AccountChat';
import PenIcon from '~/components/Icon/PenIcon';
import ChatNew from '~/components/ChatNew';
import TransferAccount from '~/components/TransferAccount';
import BoxChat from '~/components/BoxChat';
import MessIcon from '~/components/Icon/MessIcon';
import Button from '~/components/Button';
import useLogic from '~/layouts/components/Sidebar/useLogic';

const data = [
    {
        id: 1,
        title: 'Primary',
    },
    {
        id: 2,
        title: 'General',
    },
];
const Direct = () => {
    const [active, setActive] = useState<number>(1);
    const [chatNew, setChatNew] = useState<boolean>(false);
    const [transfer, setTransfer] = useState<boolean>(false);
    const { handleMode } = useLogic();
    useEffect(() => {
        handleMode(5);
    }, []);

    function handleChatNew() {
        setChatNew((prev) => (prev ? false : true));
    }
    function handleTransfer() {
        setTransfer((prev) => (prev ? false : true));
    }
    return (
        <main className="w-full">
            <div className="grid grid-cols-[398px,_1fr]">
                <div className=" border-[#ccc] border-r h-screen overflow-y-hidden">
                    <div className="flex items-center justify-between pt-9 px-6 pb-3">
                        <div className="flex items-center cursor-pointer" onClick={handleTransfer}>
                            <h2 className="text-xl font-bold">anhvanhoa.it</h2>
                            <Icon icon="ps:down" fontSize={'22px'} className="pl-2 pt-1" />
                        </div>
                        <div className="px-2 cursor-pointer" onClick={handleChatNew}>
                            <PenIcon />
                        </div>
                    </div>
                    {transfer && <TransferAccount onClose={handleTransfer} />}
                    {chatNew && <ChatNew onClose={handleChatNew} />}
                    <div className="flex justify-between items-center border-b border-[#ccc] text-neutral-500">
                        {data.map((element) => (
                            <div
                                key={element.id}
                                className={`px-4 py-3 w-1/3 text-center text-sm font-semibold border-b cursor-pointer ${
                                    active === element.id ? 'text-black border-[#000]' : ''
                                }`}
                                onClick={() => {
                                    setActive(element.id);
                                }}
                            >
                                <span>{element.title}</span>
                            </div>
                        ))}
                        <Link
                            to="/requests"
                            className={`px-4 py-3 w-1/3 text-center text-sm font-semibold border-b cursor-pointer `}
                        >
                            <span>Requests</span>
                        </Link>
                    </div>
                    <div className="h-full overflow-y-auto">
                        {active === 1 && (
                            <div>
                                <AccountChat
                                    avatar="https://images.unsplash.com/photo-1682685797886-79020b7462a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                                    userName="imduongg:>"
                                    time={21}
                                />
                                <AccountChat
                                    avatar="https://plus.unsplash.com/premium_photo-1668799886418-2335be7716e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1158&q=80"
                                    userName="na"
                                    time={11}
                                />
                            </div>
                        )}
                        {active === 2 && (
                            <div className="h-full flex items-center justify-center">
                                <p className="text-sm">Không tìm thấy tin nhắn.</p>
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    {/* <div className="flex justify-center flex-col items-center text-center h-full gap-y-3">
                        <MessIcon />
                        <p className="text-xl">Tin nhắn của bạn</p>
                        <span className="text-sm text-[#737373]">
                            Gửi ảnh và tin nhắn riêng tư cho bạn bè hoặc nhóm
                        </span>
                        <Button onClick={handleChatNew}>Gửi tin nhắn</Button>
                    </div> */}
                    <BoxChat />
                </div>
            </div>
        </main>
    );
};

export default Direct;
