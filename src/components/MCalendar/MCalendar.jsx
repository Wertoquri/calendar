import React, { useState } from 'react'
import style from "./MCalendar.module.scss"
import { getCalendarDates } from '../../utils/calendar';
import {useSelector} from 'react-redux';
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

export default function MCalendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const dates = getCalendarDates(year, month);

    let events = useSelector(state => state.events.events);

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const goToPreviousMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const goToToday = () => {
        setCurrentDate(new Date());
    };

    const isToday = (date) => {
        const today = new Date();
        return date.toDateString() === today.toDateString();
    };

    const isOtherMonth = (date) => {
        return date.getMonth() !== month;
    };

    return (
        <div className={style.wrapper}>
            <div className={style.header}>
                <h2>{monthNames[month]} {year}</h2>
                <div className={style.navButtons}>
                    <button onClick={goToPreviousMonth}><IoChevronBack /></button>
                    <button onClick={goToToday}>Today</button>
                    <button onClick={goToNextMonth}><IoChevronForward /></button>
                </div>
            </div>
            
            <div className={style.container}>
                <table>
                    <thead>
                        <tr>
                            <th>Mon</th>
                            <th>Tue</th>
                            <th>Wed</th>
                            <th>Thu</th>
                            <th>Fri</th>
                            <th>Sat</th>
                            <th>Sun</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Array.from({ length: Math.ceil(dates.length / 7) }, (_, weekIndex) => (
                                <tr key={weekIndex}>
                                    {dates.slice(weekIndex * 7, (weekIndex * 7) + 7)
                                        .map((date, index) => {
                                            const dateKey = date.toISOString().split("T")[0];
                                            const dayEvents = events.filter(e => e.date === dateKey);
                                            
                                            return (
                                                <td 
                                                    key={index}
                                                    className={`${isToday(date) ? style.today : ''} ${isOtherMonth(date) ? style['other-month'] : ''}`}
                                                >
                                                    <span className={style.number}>
                                                        {date.getUTCDate()}
                                                    </span>
                                                    {dayEvents.map((e, i) => (
                                                        <button key={i} className={style.event} style={{ backgroundColor: e.color }}>
                                                            {e.title}
                                                        </button>
                                                    ))}
                                                </td>
                                            );
                                        })}
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
