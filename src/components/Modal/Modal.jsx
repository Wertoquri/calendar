import { use, useEffect, useRef, useState } from 'react'
import style from "./Modal.module.scss"
import { IoCloseSharp } from "react-icons/io5";
import { useContext } from 'react'
import { ContextStore } from '../../store/ContextStore.jsx';


export default function Modal(props) {
    let { addEvent } = useContext(ContextStore)


    return (
        <div className={style.wrapper} onClick={(e) => {
            if (e.target === e.currentTarget) {
                props.open(false)
            }
        }}>
            <div className={style.inner}>
                <button className={style.closeButton} onClick={() => props.open(false)}><IoCloseSharp /></button>
                <h1>Додати подію</h1>
                <section>
                    <label htmlFor="title"> Назва події</label>
                    <input type="text" name='title' id="title" />

                </section>
                <section>
                    <label htmlFor="date"> Дата події</label>
                    <input type="date" name='date' id="date" />

                </section>
                <section>
                    <label htmlFor="time"> Час події</label>
                    <input type="time" name='time' id="time" />

                </section>
                <section>
                    <label htmlFor="color"> Колір події</label>
                    <input type="color" name='color' id="color" />
                </section>
                <button>Додати подію</button>
            </div>

        </div>
    )
}
