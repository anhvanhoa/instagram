import { NameIcon } from '~/assets/icons/data'
interface Menu {
    name: string
    icon: NameIcon
    to?: string
}
export const dataMenu: Menu[] = [
    {
        name: 'Setting',
        to: '/accounts/edit',
        icon: 'setting',
    },
    {
        name: 'Your activity',
        icon: 'activity',
        to: '/your_activity',
    },
    {
        name: 'Saved',
        icon: 'saved',
        to: 'anhvanhoa.it/saved',
    },
    {
        name: 'Switch apperance',
        icon: 'mode',
    },
]
