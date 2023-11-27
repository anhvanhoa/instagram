import Button from '~/components/Button';
import { Icon } from '@iconify/react';
interface Props {
    onPrev: () => void;
    onNext: () => void;
    title: string;
}
const HeadCreatePosts = ({ onPrev, title, onNext }: Props) => {
    return (
        <div>
            <div className="flex justify-between items-center h-11 border-b border-[#ccc] border-solid">
                <Button onClick={onPrev} text className="hover:text-black text-black px-2">
                    <Icon icon="ep:back" className="text-2xl cursor-pointer" />
                </Button>
                <h4 className="font-medium">{title}</h4>
                <Button text onClick={onNext}>
                    Tiếp
                </Button>
            </div>
        </div>
    );
};

export default HeadCreatePosts;
