import {useEffect, useRef, useState} from 'react'
import style from "./addForm.module.scss"

export default function AddForm() {
    let [title, setTitle] = useState("")
    let [date, setDate] = useState("")
    let [time, setTime] = useState("")
    let [color, setColor] = useState("")
    let [correct, setCorrect] = useState(false)

    useEffect(() => {
        titleRef.current.style.display = "none"
        dateRef.current.style.display = "none"
        timeRef.current.style.display = "none"

        if(title.length < 1){
            titleRef.current.style.display = "block"
        }else if(date.length < 1){
            dateRef.current.style.display = "block"
        }else if(time.length < 1){
            timeRef.current.style.display = "block"
        }else{
            setCorrect(true)
        }
    }, [title, date, time])

    let titleRef = useRef(null)
    let dateRef = useRef(null)
    let timeRef = useRef(null)
    return (
        <div className={style.wrapper}>
            <div className={style.inner}>
                <h1>Додати подію</h1>
                <section>
                    <label htmlFor="title"> Назва події</label>
                    <input type="text" name='title' id="title" value={title} onChange={e => setTitle(e.target.value)} />
                    <div className={style.error} ref={titleRef}>Назва закоротка</div>
                </section>
                <section>
                    <label htmlFor="date"> Дата події</label>
                    <input type="date" name='date' id="date" value={date} onChange={e => setDate(e.target.value)} />
                    <div className={style.error} ref={dateRef}>Дата не вибрана</div>
                </section>
                <section>
                    <label htmlFor="time"> Час події</label>
                    <input type="time" name='time' id="time" value={time} onChange={e => setTime(e.target.value)} />
                    <div className={style.error} ref={timeRef}>Час не вибрано</div>
                </section>
                <section>
                    <label htmlFor="color"> Колір події</label>
                    <input type="color" name='color' id="color" value={color} onChange={e => setColor(e.target.value)} />
                </section>
                <button>Додати подію</button>
            </div>

        </div>
    )
}
