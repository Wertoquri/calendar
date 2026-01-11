import React from 'react'
// import PropTypes from 'prop-types'
import style from "./header.module.scss"
import { FaCalendarWeek } from "react-icons/fa";
import { FaCalendarDay } from "react-icons/fa6";
import { BsCalendar2MonthFill } from "react-icons/bs";
import { IoCalendarNumberSharp } from "react-icons/io5";



function Header(props) {
    return (
        <header className={style.wrapper}>
            <div className={style.iconBar}><IoCalendarNumberSharp />
                <h3>My Calendar</h3></div>
            <nav>
                <a href="" className={style.link}>
                    Main</a>
                <a href="" className={style.link}><BsCalendar2MonthFill />
                    Month</a>
                <a href="" className={style.link}><FaCalendarWeek />
                    Week</a>
                <a href="" className={style.link}><FaCalendarDay />
                    Day</a>
            </nav>
        </header>
    )
}

// Header.propTypes = {

// }

export default Header

