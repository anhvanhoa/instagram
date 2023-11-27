/* eslint-disable import/no-anonymous-default-export */
class Birthday {
    generateYears(fromYear: number = 1959): number[] {
        const listYear: number[] = [];
        const currYear = new Date().getFullYear();
        for (; fromYear <= currYear; fromYear++) {
            listYear.unshift(fromYear);
        }
        return listYear;
    }
    generateMonth(): number[] {
        const listMonth: number[] = [];
        for (let i = 1; i <= 12; i++) {
            listMonth.push(i);
        }
        return listMonth;
    }
    generateDay(month: number, year: number): number[] {
        const listDay: number[] = [];
        const lastDayOfMonth = new Date(year, month, 0).getDate();
        for (let i = 1; i <= lastDayOfMonth; i++) {
            listDay.push(i);
        }
        return listDay;
    }
    checkAge(day: number, month: number, year: number) {
        const date = new Date();
        let currYear = date.getFullYear();
        let currMonth = date.getMonth();
        let currDay = date.getDate();
        const age = currYear - year;
        if (age > 17) return true;
        if (age < 17) return false;
        if (age === 17) {
            if (currMonth <= month && day >= currDay) {
                return true;
            }
            return false;
        }
    }
}
export default new Birthday();
