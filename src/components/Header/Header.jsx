import React from 'react'
// import PropTypes from 'prop-types'
import style from "./header.module.scss"
import { FaCalendarWeek } from "react-icons/fa";
import { FaCalendarDay } from "react-icons/fa6";
import { BsCalendar2MonthFill } from "react-icons/bs";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { NavLink } from 'react-router-dom';


function Header(props) {
    return (
        <header className={style.wrapper}>
            <div className={style.iconBar}><IoCalendarNumberSharp />
                <h3>My Calendar</h3></div>
            <nav>
                <NavLink to="/" className={style.link}>
                    Main</NavLink>
                <NavLink to="/month" className={style.link}><BsCalendar2MonthFill />
                    Month</NavLink>
                <NavLink to="/week" className={style.link}><FaCalendarWeek />
                    Week</NavLink>
                <NavLink to="/day" className={style.link}><FaCalendarDay />
                    Day</NavLink>
            </nav>
        </header>
    )
}

// Header.propTypes = {

// }

export default Header

