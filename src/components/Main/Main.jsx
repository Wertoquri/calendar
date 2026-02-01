import React from 'react'
import style from "./main.module.scss"
import MCalendar from '../MCalendar/MCalendar'
import { Routes, Route } from 'react-router-dom';

export default function Main() {
  return (
    <main className={style.main}>
      <Routes>
        <Route path="/" element={<MCalendar />} />
        <Route path="/month" element={<h1>Month</h1>} />
        <Route path="/week" element={<h1>Week</h1>} />
        <Route path="/day" element={<h1>Day</h1>} />
      </Routes>

    </main>
  )
}
