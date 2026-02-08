import React from 'react'
import style from "./main.module.scss"
import MCalendar from '../MCalendar/MCalendar'
import { Routes, Route } from 'react-router-dom';
import WCalendar from '../WCalendar/WCalendar';
import DCalendar from '../DCalendar/DCalendar';

export default function Main() {
  return (
    <main className={style.main}>
      <Routes>
        <Route path="/" element={<MCalendar />} />
        <Route path="/month" element={<h1>Month</h1>} />
        <Route path="/week" element={<WCalendar />} />
        <Route path="/day" element={<DCalendar />} />
      </Routes>

    </main>
  )
}
