type TypeOption = 'me' | 'other' | 'normal' | 'hidden'
export interface OptionCommon<HandleName = string, DataChildren = any> {
    id: number
    title: string
    handleName: HandleName
    isStopPropagation: boolean
    element?: React.FC<any>
    children?: {
        title: string
        subtitle?: string
        data: DataChildren[]
    }
    to?: string
    type: TypeOption
    classname?: string
    icon?: {
        name: string
        place: 'left' | 'right'
    }
}
