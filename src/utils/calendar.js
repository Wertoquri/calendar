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

export const getCalendarDatesInWeek = (year, month, currentDate) => {
    let startWeek = new Date(year, month, currentDate.getDate() - 7 -  currentDate.getDay() + 2);
    const dates = [];

    for (let i = 0; i < 7; i++) {
        const date = new Date(year, month, startWeek.getDate() + i);
        dates.push(date);
    }
    return dates;
}

export const getMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
}

