import React, { useState } from 'react'
import style from "./WCalendar.module.scss"
import { getCalendarDatesInWeek, getMinutes } from '../../utils/calendar';
import {useSelector} from 'react-redux';

export default function WCalendar(props) {

    const [currentDate, setCurrentDate] = useState(new Date());
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const dates = getCalendarDatesInWeek(year, month, currentDate);

    let events = useSelector(state => state.events.events);

    const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <table>
                    <thead>
                        <tr>
                            <th>Понеділок</th>
                            <th>Вівторок</th>
                            <th>Середа</th>
                            <th>Четвер</th>
                            <th>П'ятниця</th>
                            <th>Субота</th>
                            <th>Неділя</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {dates.map((date, index) => {
                                const dateStr = formatDate(date);
                                return (
                                    <td key={index}>
                                        <span className={style.number}>
                                            {date.getUTCDate()}
                                        </span>
                                        <div className={style.events}>
                                            {
                                                events.filter((e) => e.date === dateStr)
                                                    .sort((a, b) => getMinutes(a.time) - getMinutes(b.time))
                                                    .map((e, i) => (
                                                        <button key={i} className={style.event}
                                                            style={{ borderLeftColor: e.color, borderLeftWidth: "6px" }}
                                                        >
                                                            {e.time} - {e.title}
                                                        </button>
                                                    ))
                                            }
                                        </div>
                                    </td>
                                );
                            })}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
