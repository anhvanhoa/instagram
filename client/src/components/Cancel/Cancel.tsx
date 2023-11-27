import Button from '~/components/Button';
import OverLay from '~/components/OverLay';
interface Props {
    handleCancel: () => void;
    handleBack: () => void;
}
const Cancel = ({ handleCancel, handleBack }: Props) => {
    return (
        <OverLay onClose={handleBack}>
            <div className="bg-white rounded-xl">
                <div className="px-10 py-7 text-center">
                    <p className="text-xl pb-2">Bỏ bài viết?</p>
                    <p className="text-sm text-second">Nếu rời đi, bạn sẽ mất những gì vừa chỉnh sửa.</p>
                </div>
                <div>
                    <Button
                        onClick={handleCancel}
                        text
                        className="hover:text-red-500 text-red-500 w-full border-t border-[#ccc]/50 border-solid py-4 font-bold"
                    >
                        Bỏ
                    </Button>
                    <Button
                        onClick={handleBack}
                        text
                        className="font-normal text-black w-full border-t border-[#ccc]/50 border-solid py-4"
                    >
                        Hủy
                    </Button>
                </div>
            </div>
        </OverLay>
    );
};

export default Cancel;
