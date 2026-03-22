import React from 'react'
import style from "./header.module.scss"
import { FaCalendarWeek } from "react-icons/fa";
import { FaCalendarDay } from "react-icons/fa6";
import { BsCalendar2MonthFill } from "react-icons/bs";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeToken, uploadTokenFromLocalStorage } from "../../store/AuthReducer.js"


function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state => state.auth.token);
    const isAuth = token != null;

    const logout = () => {
        dispatch(removeToken());
        navigate('/');
    }

    return (
        <header className={style.wrapper}>
            <div className={style.iconBar}>
                <IoCalendarNumberSharp />
                <h3>My Calendar</h3>
            </div>
            <nav>
                <NavLink to="/" className={({ isActive }) => isActive ? style.active : style.link}>
                    <span>Main</span>
                </NavLink>
                <NavLink to="/month" className={({ isActive }) => isActive ? style.active : style.link}>
                    <BsCalendar2MonthFill />
                    <span>Month</span>
                </NavLink>
                <NavLink to="/week" className={({ isActive }) => isActive ? style.active : style.link}>
                    <FaCalendarWeek />
                    <span>Week</span>
                </NavLink>
                <NavLink to="/day" className={({ isActive }) => isActive ? style.active : style.link}>
                    <FaCalendarDay />
                    <span>Day</span>
                </NavLink>
                {
                    isAuth ? (
                        <>
                            <NavLink to="/login" className={({ isActive }) => isActive ? style.active : style.link}>
                                <span>Login</span>
                            </NavLink>
                            <NavLink to="/register" className={({ isActive }) => isActive ? style.active : style.link}>
                                <span>Register</span>
                            </NavLink>
                            <button onClick={logout}>Log out</button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" className={({ isActive }) => isActive ? style.active : style.link}>
                                <span>Login</span>
                            </NavLink>
                            <NavLink to="/register" className={({ isActive }) => isActive ? style.active : style.link}>
                                <span>Register</span>
                            </NavLink>
                        </>
                    )
                }
            </nav>
        </header>
    )
}

export default Header

