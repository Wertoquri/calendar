import React, { useState } from 'react'
import style from "./WCalendar.module.scss"
import { getCalendarDatesInWeek, getMinutes } from '../../utils/calendar';
import {useSelector} from 'react-redux';
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

export default function WCalendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const dates = getCalendarDatesInWeek(year, month, currentDate);

    let events = useSelector(state => state.events.events);

    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const goToPreviousWeek = () => {
        setCurrentDate(new Date(year, month, currentDate.getDate() - 7));
    };

    const goToNextWeek = () => {
        setCurrentDate(new Date(year, month, currentDate.getDate() + 7));
    };

    const goToToday = () => {
        setCurrentDate(new Date());
    };

    const isToday = (date) => {
        const today = new Date();
        return date.toDateString() === today.toDateString();
    };

    return (
        <div className={style.wrapper}>
            <div className={style.header}>
                <h2>Week of {dates[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {dates[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</h2>
                <div className={style.navButtons}>
                    <button onClick={goToPreviousWeek}><IoChevronBack /></button>
                    <button onClick={goToToday}>Today</button>
                    <button onClick={goToNextWeek}><IoChevronForward /></button>
                </div>
            </div>
            
            <div className={style.container}>
                <div className={style.weekGrid}>
                    {dates.map((date, index) => {
                        const dateKey = date.toISOString().split("T")[0];
                        const dayEvents = events
                            .filter(e => e.date === dateKey)
                            .sort((a, b) => getMinutes(a.time) - getMinutes(b.time));
                        const isTodayDate = isToday(date);

                        return (
                            <div 
                                key={index} 
                                className={`${style.dayColumn} ${isTodayDate ? style.today : ''}`}
                            >
                                <div className={`${style.dayHeader} ${isTodayDate ? style.today : ''}`}>
                                    <span className={style.dayName}>{dayNames[index]}</span>
                                    <span className={style.dayNumber}>{date.getUTCDate()}</span>
                                </div>
                                <div className={style.eventsContainer}>
                                    {dayEvents.length > 0 ? (
                                        dayEvents.map((e, i) => (
                                            <button 
                                                key={i} 
                                                className={style.event}
                                                style={{ borderLeftColor: e.color }}
                                            >
                                                <span className={style.eventTime}>{e.time}</span>
                                                <span className={style.eventTitle}>{e.title}</span>
                                            </button>
                                        ))
                                    ) : (
                                        <div className={style.noEvents}>No events</div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}
