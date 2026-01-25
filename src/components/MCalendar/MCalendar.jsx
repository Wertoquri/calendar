import React, { useState } from 'react'
import style from "./MCalendar.module.scss"
import { getCalendarDates } from '../../utils/calendar';

export default function MCalendar(props) {

    const[currentDate, setCurrentDate] = useState(new Date());
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const dates = getCalendarDates(year, month);
    console.log(dates);
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
            </table>
        </div>
      
    </div>
  )
}
