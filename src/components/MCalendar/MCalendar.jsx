import React, { useState } from 'react'
import style from "./MCalendar.module.scss"
import { getCalendarDates } from '../../utils/calendar';
import {useSelector} from 'react-redux';

export default function MCalendar(props) {

    const [currentDate, setCurrentDate] = useState(new Date());
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const dates = getCalendarDates(year, month);

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
                        {
                            Array.from({ length: Math.ceil(dates.length / 7) }, (_, weekIndex) => (
                                <tr key={weekIndex}>
                                    {dates.slice(weekIndex * 7, (weekIndex * 7) + 7)
                                        .map((date, index) => {
                                            const dateStr = formatDate(date);
                                            return (
                                                <td key={index}>
                                                    <span className={style.number}>
                                                        {date.getUTCDate()}
                                                    </span>
                                                    {
                                                        events.filter((e) => e.date === dateStr)
                                                            .map((e, i) => (
                                                                <button key={i} className={style.event}
                                                                    style={{ backgroundColor: e.color }}
                                                                >
                                                                    {e.title}
                                                                </button>
                                                            ))
                                                    }
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
