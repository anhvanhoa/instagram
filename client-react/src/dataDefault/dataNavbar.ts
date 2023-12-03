import images from '~/assets/images';
import routers from '~/config/routers/routers';

type navbar = {
    id: number;
    icon_thin: string;
    icon_solid: string;
    name: string;
    to: string;
};

const dataNavbar: navbar[] = [
    {
        id: 1,
        icon_thin: images.home_icon_thin,
        icon_solid: images.home_icon_solid,
        name: 'Trang chủ',
        to: routers.home,
    },
    {
        id: 2,
        icon_thin: images.search_icon_thin,
        icon_solid: images.search_icon_solid,
        name: 'Tìm kiếm',
        to: '#',
    },
    {
        id: 3,
        icon_thin: images.compass_icon_thin,
        icon_solid: images.compass_icon_solid,
        name: 'Khám phá',
        to: routers.explore,
    },
    {
        id: 4,
        icon_thin: images.video_icon_thin,
        icon_solid: images.video_icon_solid,
        name: 'Reels',
        to: routers.reels,
    },
    {
        id: 5,
        icon_thin: images.message_icon_thin,
        icon_solid: images.message_icon_solid,
        name: 'Tin Nhắn',
        to: routers.direct,
    },
    {
        id: 6,
        icon_thin: images.notify_icon_thin,
        icon_solid: images.notify_icon_solid,
        name: 'Thông báo',
        to: '#',
    },
    {
        id: 7,
        icon_thin: images.create_icon_thin,
        icon_solid: images.create_icon_solid,
        name: 'Tạo',
        to: '#',
    },
];

export default dataNavbar;
