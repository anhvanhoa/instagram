// type BirthType = 'day' | 'year' | 'month'
const generateBirthday = () => {
    return {
        generateYear: () => {
            const years: number[] = []
            const end = new Date().getFullYear()
            for (let index = 1790; index <= end; index++) {
                years.push(index)
            }
            return years
        },
        generateMoth: () => {
            const months: number[] = []
            for (let index = 1; index <= 12; index++) {
                months.push(index)
            }
            return months
        },
        generateDay: (m: number, y: number) => {
            const lastDayOfMonth = new Date(y, m, 0).getDate()
            const days = []
            for (let index = 1; index <= lastDayOfMonth; index++) {
                days.push(index)
            }
            return days
        },
        checkAge: (y: number, m: number, d: number) => {
            const date = new Date()
            let age = date.getFullYear() - y
            if (date.getMonth() + 1 < m || (date.getMonth() + 1 == m && date.getDate() < d)) {
                age--
            }
            return { birthday: `${y}-${m}-${d}`, age }
        }
    }
}

export default generateBirthday
