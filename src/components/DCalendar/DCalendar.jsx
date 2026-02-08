import React, { useState, useContext, use } from 'react'
import style from "./DCalendar.module.scss"
import { getCalendarDatesInWeek, getMinutes } from '../../utils/calendar';
import { ContextStore } from '../../store/ContextStore';

export default function DCalendar(props) {

    const [currentDate, setCurrentDate] = useState(new Date());

    let { events } = useContext(ContextStore);
    console.log(events);
    return (
        <div className={style.wrapper}>
            <div className={style.container}>

                {
                    events.filter((e, i) =>
                    new Date(e.date).toDateString() == new Date(currentDate).toDateString()
                
                )
                        .sort((a, b) => getMinutes(a.time) - getMinutes(b.time))
                        .map((e, i) => (
                            <button key={i} className={style.event}
                                style={{
                                    borderLeftColor: e.color,
                                    borderLeftWidth: "6px"
                                }}
                            >
                                {e.time} - {e.title}
                            </button>
                        ))


                }
            </div>
        </div>

    )
}
