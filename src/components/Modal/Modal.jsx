import { use, useEffect, useRef, useState } from 'react'
import style from "./Modal.module.scss"
import { IoCloseSharp } from "react-icons/io5";
import { useContext } from 'react'
import { ContextStore } from '../../store/ContextStore.jsx';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { addEvent as addNewEvent} from "../../store/EventsReducer.js";



export default function Modal(props) {
    let dispatch = useDispatch();

    let { register, handleSubmit, formState: { errors }, reset } = useForm()

    const submit = (data) => {
        console.log(data)
        dispatch(addNewEvent(data))
        props.open(false)
        reset()
    }

    return (
        <div className={style.wrapper} onClick={(e) => {
            if (e.target === e.currentTarget) {
                props.open(false)
            }
        }}>
            <form onSubmit={handleSubmit(submit)} className={style.inner}>
                <button className={style.closeButton} onClick={() => props.open(false)}><IoCloseSharp /></button>
                <h1>Додати подію</h1>
                <section>
                    <label htmlFor="title"> Назва події</label>
                    <input type="text" name='title' id="title" {...register("title", {
                        required: true,
                        minLength: 3,
                        maxLength: 40,
                        pattern: {
                            value: /^[a-zA-Z0-9\s]*$/,
                            message: "Only letters, numbers and spaces are allowed"
                        },
                        message: "Invalid title"
                    })} />

                </section>
                <section>
                    <label htmlFor="date"> Дата події</label>
                    <input type="date" name='date' id="date" {...register("date"
                        , {
                            required: {
                                value: true,
                                message: "Date is required"
                            },

                        }
                    )} />

                </section>
                <section>
                    <label htmlFor="time"> Час події</label>
                    <input type="time" name='time' id="time" {...register("time", {
                        required: {
                            value: true,
                            message: "Time is required"
                        }

                    })} />

                </section>
                <section>
                    <label htmlFor="color"> Колір події</label>
                    <input type="color" name='color' id="color" {...register("color"
                        , {
                            value: "#000000"
                        }
                    )

                    } />
                </section>
                <section>
                    {(errors.title || errors.date || errors.time) && (<span className={style.error}>
                        {errors.title?.message}
                        {errors.date?.message}
                        {errors.time?.message}
                    </span>)}
                </section>
                <button type="submit" >Додати подію</button>
            </form>

        </div>
    )
}
