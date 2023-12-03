import TippyHeadLess from '@tippyjs/react/headless';
import RatioSquare from '~/components/Icon/RatioSquare';
import RatioVertical from '~/components/Icon/RatioVertical';
import RatioHorizontal from '~/components/Icon/RatioHorizontal';
import Button from '~/components/Button';
import ZoomIcon from '~/components/Icon/ZoomIcon';
import { Icon } from '@iconify/react';
import { memo } from 'react';

const listAspect = [
    {
        title: 'Gốc',
        aspect: 'origin',
        icon: RatioSquare,
    },
    {
        title: '1:1',
        aspect: '1',
        icon: RatioSquare,
    },
    {
        title: '4:5',
        aspect: '4/5',
        icon: RatioVertical,
    },
    {
        title: '16:9',
        aspect: '16/9',
        icon: RatioHorizontal,
    },
];

interface Props {
    onAspect: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    valueRange: number;
    onRange: (value: React.SetStateAction<number>) => void;
}
const Tools = ({ onAspect, valueRange, onRange }: Props) => {
    return (
        <div className="flex items-center gap-3">
            <>
                <TippyHeadLess
                    trigger="click"
                    placement="top-start"
                    interactive
                    render={() => (
                        <div className="bg-[#222]/90 text-white px-3 rounded-xl flex flex-col">
                            {listAspect.map((item, index) => (
                                <div
                                    key={index}
                                    data-aspect={item.aspect}
                                    onClick={onAspect}
                                    className="flex items-center text-white/80 cursor-pointer last:border-transparent border-b border-solid border-[#ccc] py-3"
                                >
                                    <p className="text-sm">{item.title}</p>
                                    <span className="flex-shrink-0 ml-2">
                                        {<item.icon color="rgba(255, 255, 255, 0.8)" />}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                >
                    <div className="">
                        <Button className="cursor-pointer bg-[#222] hover:bg-[#222]/80 rounded-circle p-2 inline-block">
                            <ZoomIcon color="#fff" />
                        </Button>
                    </div>
                </TippyHeadLess>
            </>
            <>
                <TippyHeadLess
                    trigger="click"
                    placement="top-start"
                    interactive
                    render={() => (
                        <div className="absolute bottom-full bg-[#222]/80 flex items-center rounded-lg box-border py-4 px-3 w-32">
                            <div
                                className="bg-white h-[1px] relative z-10"
                                style={{ width: `${(valueRange / 20) * 100}%` }}
                            >
                                <div className="w-4 h-4 bg-white rounded-circle absolute left-[85%] -translate-y-1/2 top-1/2 z-[-1] pointer-events-none"></div>
                            </div>
                            <input
                                type="range"
                                max={20}
                                min={0}
                                onChange={(e) => onRange(Number(e.target.value))}
                                value={valueRange}
                                className="appearance-none h-[1px] rounded-md cursor-pointer in-range:bg-black absolute inset-0 my-4 mx-3"
                            />
                        </div>
                    )}
                >
                    <div className="">
                        <Button className="cursor-pointer bg-[#222222] hover:bg-[#222]/80 rounded-circle p-2 inline-block">
                            <Icon icon="codicon:zoom-in" className="text-white text-lg" />
                        </Button>
                    </div>
                </TippyHeadLess>
            </>
        </div>
    );
};

export default memo(Tools);
