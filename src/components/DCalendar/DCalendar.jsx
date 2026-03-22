import React, { useState } from 'react'
import style from "./DCalendar.module.scss"
import { getMinutes } from '../../utils/calendar';
import {useSelector} from 'react-redux';
import { IoChevronBack, IoChevronForward, IoTimeOutline, IoCalendarOutline } from "react-icons/io5";

export default function DCalendar() {
    const [currentDate, setCurrentDate] = useState(new Date());

    let events = useSelector(state => state.events.events);

    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const goToPreviousDay = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 1));
    };

    const goToNextDay = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1));
    };

    const goToToday = () => {
        setCurrentDate(new Date());
    };

    const isToday = () => {
        const today = new Date();
        return currentDate.toDateString() === today.toDateString();
    };

    const dayEvents = events
        .filter(e => new Date(e.date).toDateString() === currentDate.toDateString())
        .sort((a, b) => getMinutes(a.time) - getMinutes(b.time));

    // Generate time slots from 6 AM to 10 PM
    const timeSlots = [];
    for (let hour = 6; hour <= 22; hour++) {
        timeSlots.push(hour);
    }

    const formatTime = (hour) => {
        const period = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
        return `${displayHour}:00 ${period}`;
    };

    const getEventsForHour = (hour) => {
        return dayEvents.filter(e => {
            const eventHour = parseInt(e.time.split(':')[0]);
            return eventHour === hour;
        });
    };

    return (
        <div className={style.wrapper}>
            <div className={style.header}>
                <h2>{dayNames[currentDate.getDay()]}, {currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</h2>
                <div className={style.navButtons}>
                    <button onClick={goToPreviousDay}><IoChevronBack /></button>
                    <button onClick={goToToday}>Today</button>
                    <button onClick={goToNextDay}><IoChevronForward /></button>
                </div>
            </div>
            
            <div className={style.container}>
                <div className={`${style.dayInfo} ${isToday() ? style.today : ''}`}>
                    <span className={style.dayName}>{dayNames[currentDate.getDay()]}</span>
                    <span className={style.dayNumber}>{currentDate.getDate()}</span>
                </div>

                {dayEvents.length > 0 ? (
                    <div className={style.timeline}>
                        {timeSlots.map((hour) => {
                            const hourEvents = getEventsForHour(hour);
                            return (
                                <div key={hour} className={style.timeSlot}>
                                    <span className={style.timeLabel}>{formatTime(hour)}</span>
                                    {hourEvents.map((e, i) => (
                                        <button key={i} className={style.event} style={{ borderLeftColor: e.color }}>
                                            <div className={style.eventHeader}>
                                                <span className={style.eventTitle}>{e.title}</span>
                                                <span className={style.eventColor} style={{ background: e.color }}></span>
                                            </div>
                                            <span className={style.eventTime}>
                                                <IoTimeOutline /> {e.time}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className={style.noEvents}>
                        <IoCalendarOutline />
                        <p>No events for this day</p>
                        <span>Click the + button to add an event</span>
                    </div>
                )}
            </div>
        </div>
    )
}
