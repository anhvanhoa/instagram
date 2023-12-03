import { Link } from 'react-router-dom';
import images from '~/assets/images';
import { memo } from 'react';

interface Props {
    to?: string;
    userName: string;
    avatar: string;
    name: string;
    size?: 'small' | 'extra' | 'medium';
    classNames?: string;
}

const Avatar = ({ to, userName, avatar, name, size = 'medium', classNames }: Props) => {
    let Component: string | typeof Link = 'div';
    if (to) {
        Component = Link;
    }
    return (
        <div className={`relative flex items-center justify-center flex-shrink-0 pr-3`}>
            <Component
                to={userName}
                className={`${size === 'medium' && 'w-11 h-11'} ${size === 'small' && 'w-8 h-8'} ${
                    size === 'extra' && 'w-40 h-40'
                } ${classNames}`}
            >
                <img src={avatar || images.notAvatar} alt={name} className="rounded-circle" />
            </Component>
            {/* {story && (
                <div className={'absolute top-[-5px] left-[-5px] z-10'}>
                    <svg width={54} height={54}>
                        <linearGradient id="my-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="5%" stopColor="#F4A14B" />
                            <stop offset="50%" stopColor="#E1306C" />
                            <stop offset="100%" stopColor="#A233FA" />
                        </linearGradient>
                        <circle
                            cx={27}
                            cy={27}
                            r={26}
                            stroke={viewStory ? 'url(#my-gradient)' : '#DBDBDB'}
                            strokeWidth={viewStory ? 2 : 1}
                            fill="transparent"
                        />
                    </svg>
                </div>
            )} */}
        </div>
    );
};

export default memo(Avatar);
