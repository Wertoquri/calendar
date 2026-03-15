import React, { useState, useContext, use } from 'react'
import style from "./WCalendar.module.scss"
import { getCalendarDatesInWeek, getMinutes } from '../../utils/calendar';
import { ContextStore } from '../../store/ContextStore';
import {useSelector} from 'react-redux';

export default function WCalendar(props) {

    const [currentDate, setCurrentDate] = useState(new Date());
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const dates = getCalendarDatesInWeek(year, month, currentDate);

    let events = useSelector(state => state.events.events);

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

                            <tr>
                                {dates.map((date, index) => (
                                        <td key={index}>
                                            <span className={style.number}>
                                                {date.getUTCDate()}

                                            </span>
                                            <div className={style.events}>
                                            {
                                                events.filter((e, i) => e.date == date.toISOString().split("T")[0])
                                                    .sort((a, b) => getMinutes(a.time) - getMinutes(b.time))
                                                    .map((e, i) => (
                                                        <button key={i} className={style.event}
                                                            style={{ borderLeftColor: e.color ,
                                                            borderLeftWidth: "6px"
                                                            }}
                                                        >
                                                           {e.time} - {e.title}
                                                        </button>
                                                    ))
                                                    
                                                    
                                            }
                                            </div>
                                        </td>

                                    ))}
                            </tr>

                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}
