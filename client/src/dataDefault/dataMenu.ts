import images from '~/assets/images';
interface Menu {
    name: string;
    icon: string;
    to?: string;
}
const dataMenu: Menu[] = [
    {
        name: 'Cài đặt',
        icon: images.setting_icon,
        to: '/account/edit',
    },
    {
        name: 'Hoạt động của bạn',
        icon: images.activity_icon,
        to: '/your_activity',
    },
    {
        name: 'Đã lưu',
        icon: images.saved_icon,
        to: 'anhvanhoa.it/saved',
    },
    {
        name: 'Chuyển chế độ',
        icon: images.mode_icon,
    },
    {
        name: 'Báo cáo sự cố',
        icon: images.problem_icon,
    },
];

export default dataMenu;
