import React from 'react'
import style from "./main.module.scss"
import MCalendar from '../MCalendar/MCalendar'

export default function Main() {
  return (
    <main className={style.main}>
      <MCalendar/>
    </main>
  )
}
