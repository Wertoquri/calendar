import { useEffect } from 'react'
import style from "./Modal.module.scss"
import { IoCloseSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { addEvent } from "../../store/EventsReducer.js";


export default function Modal({ open, setOpen }) {
    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state.events);

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            title: '',
            date: '',
            time: '',
            color: '#6366f1'
        }
    })

    const submit = async (data) => {
        try {
            await dispatch(addEvent(data)).unwrap();
            setOpen(false);
            reset();
        } catch (err) {
            console.error('Failed to add event:', err);
            alert('Failed to add event: ' + err);
        }
    }

    return (
        <div className={style.wrapper} onClick={(e) => {
            if (e.target === e.currentTarget) {
                setOpen(false)
            }
        }}>
            <form onSubmit={handleSubmit(submit)} className={style.inner}>
                <button type="button" className={style.closeButton} onClick={() => setOpen(false)}>
                    <IoCloseSharp />
                </button>
                <h1>Add Event</h1>
                
                <section>
                    <label htmlFor="title">Event Title</label>
                    <input 
                        type="text" 
                        id="title" 
                        placeholder="Enter event title"
                        {...register("title", {
                            required: "Title is required",
                            minLength: {
                                value: 3,
                                message: "Min length 3 characters"
                            },
                            maxLength: {
                                value: 40,
                                message: "Max length 40 characters"
                            }
                        })} 
                    />
                    {errors.title && <span className={style.error}>{errors.title.message}</span>}
                </section>

                <section>
                    <label htmlFor="date">Date</label>
                    <input 
                        type="date" 
                        id="date" 
                        {...register("date", {
                            required: "Date is required"
                        })} 
                    />
                    {errors.date && <span className={style.error}>{errors.date.message}</span>}
                </section>

                <section>
                    <label htmlFor="time">Time</label>
                    <input 
                        type="time" 
                        id="time" 
                        {...register("time", {
                            required: "Time is required"
                        })} 
                    />
                    {errors.time && <span className={style.error}>{errors.time.message}</span>}
                </section>

                <section>
                    <label htmlFor="color">Color</label>
                    <input 
                        type="color" 
                        id="color" 
                        {...register("color")}
                        defaultValue="#6366f1"
                    />
                </section>

                {error && (
                    <section>
                        <span className={style.error}>{error}</span>
                    </section>
                )}

                <button type="submit" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Event'}
                </button>
            </form>
        </div>
    )
}
