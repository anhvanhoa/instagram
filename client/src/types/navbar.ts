import { NameIcon } from '~/assets/icons/data'
export interface NavbarItem {
    id: number
    name: string
    icon: NameIcon
    iconActive: NameIcon
    link: string
    // class: string
}
