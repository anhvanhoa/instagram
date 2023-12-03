interface Props {
    avatar: string;
    userName: string;
    time: number;
}
const AccountChat = ({ avatar, userName, time }: Props) => {
    return (
        <div className="flex items-center px-6 py-2">
            <div className="w-14 h-14 overflow-hidden rounded-circle ">
                <img src={avatar} alt="" />
            </div>
            <div className="ml-3 flex flex-col gap-y-1">
                <p className="text-sm">{userName}</p>
                <p className="text-xs text-[#737373]">Hoạt động {time} giờ trước</p>
            </div>
        </div>
    );
};

export default AccountChat;
