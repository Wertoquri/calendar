export const getCalendarDates = (year, month) => {
    let startOfMonth = new Date(year, month, 0);
    let endOfMonth = new Date(year, month + 1, 0);

    const startDay = startOfMonth.getDay() - 1 || 7;

    const totalDays = endOfMonth.getDate() + 1;

    const dates = [];

    for (let i = 1 - startDay; i < totalDays; i++) {
        const date = new Date(year, month, i);
        dates.push(date);
    }
    return dates;
}