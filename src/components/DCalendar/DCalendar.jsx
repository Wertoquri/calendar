import React, { useState } from 'react'
import style from "./DCalendar.module.scss"
import { getMinutes } from '../../utils/calendar';
import {useSelector} from 'react-redux';

export default function DCalendar(props) {

    const [currentDate, setCurrentDate] = useState(new Date());

    let events = useSelector(state => state.events.events);

    const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const todayStr = formatDate(currentDate);

    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                {
                    events.filter((e) => e.date === todayStr)
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
