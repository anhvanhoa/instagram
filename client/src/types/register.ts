export interface DataRegister {
    email: string
    numberPhone: string
    fullName: string
    userName: string
    password: string
    birthday: string
    otp: string
}

export interface BirthdayType {
    day: number
    month: number
    year: number
}

export interface UniqueUser {
    email?: string
    numberPhone?: string
    userName?: string
}
