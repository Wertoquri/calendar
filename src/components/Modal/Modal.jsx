import { useEffect } from 'react'
import style from "./Modal.module.scss"
import { IoCloseSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { addNewEvent, fetchEvents } from "../../store/EventsReducer.js";



export default function Modal(props) {
    let dispatch = useDispatch();
    let { loading, error } = useSelector(state => state.events);

    let { register, handleSubmit, formState: { errors }, reset } = useForm()

    const submit = async (data) => {
        console.log('Submitting event:', data);
        await dispatch(addNewEvent(data));
        await dispatch(fetchEvents());
        props.open(false);
        reset({
            title: '',
            date: '',
            time: '',
            color: '#6366f1'
        });
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
                            value: /^[a-zA-Z0-9\sа-яА-ЯЇїІіЄєЇЇҐґ]*$/,
                            message: "Only letters, numbers and spaces are allowed"
                        }
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
                            value: "#6366f1"
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
                    {error && <span className={style.error}>{error}</span>}
                </section>
                <button type="submit" disabled={loading}>
                    {loading ? 'Додавання...' : 'Додати подію'}
                </button>
            </form>

        </div>
    )
}
