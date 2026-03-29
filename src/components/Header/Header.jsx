import React from 'react'
// import PropTypes from 'prop-types'
import style from "./header.module.scss"
import { FaCalendarWeek } from "react-icons/fa";
import { FaCalendarDay } from "react-icons/fa6";
import { BsCalendar2MonthFill } from "react-icons/bs";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {removeToken} from "../../store/AuthReducer.js"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function Header(props) {
    let isAuth = useSelector(state => state.auth.token) != null;
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let logout = () => {
        dispatch(removeToken());
        navigate('/login');
    }

    return (
        <header className={style.wrapper}>
            <div className={style.iconBar}><IoCalendarNumberSharp />
                <h3>My Calendar</h3></div>
            <nav>
                <NavLink to="/" className={({ isActive }) => isActive ? style.active : style.link}>
                    Main</NavLink>
                <NavLink to="/month" className={({ isActive }) => isActive ? style.active : style.link}><BsCalendar2MonthFill />
                    Month</NavLink>
                <NavLink to="/week" className={({ isActive }) => isActive ? style.active : style.link}><FaCalendarWeek />
                    Week</NavLink>
                <NavLink to="/day" className={({ isActive }) => isActive ? style.active : style.link}><FaCalendarDay />
                    Day</NavLink>
                {
                    isAuth ? (
                        <button onClick={logout} className={style.logoutBtn}>Log out</button>
                    ) : (
                    <>
                        <NavLink to="/login" className={({ isActive }) => isActive ? style.active : style.link}>Login</NavLink>
                        <NavLink to="/register" className={({ isActive }) => isActive ? style.active : style.link}>Register</NavLink>
                    </>
                   )
                }
            </nav>
        </header>
    )
}

// Header.propTypes = {

// }

export default Header

