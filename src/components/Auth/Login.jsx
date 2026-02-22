import React from 'react'
import style from "./Auth.module.scss"
import { useForm } from "react-hook-form"

export default function Login() {
    const { register, handleSubmit, formState: { errors }, watch } = useForm()

    return (
        <div className={style.wrapper}>
            <form onSubmit={handleSubmit((data) => console.log(data))}>
                <h1>Login</h1>
                <label htmlFor="email">Email</label>
                <input type="email" id='email' {
                    ...register("email",
                        {
                            required: {
                                value: true,
                                message: "Email is required"
                            },
                            pattern: {
                                value: /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/,
                                message: "Invalid email address"
                            }
                        }
                    )
                } />
                <span>
                    {errors.email?.message}
                </span>
                <br />

                <label htmlFor="password">Password</label>
                <input type="password" id='password' {
                    ...register("password", {
                        required: { value: true, message: "Password is required" },
                        minLength: { value: 6, message: "Min length 8 characters" },
                        maxLength: { value: 64, message: "Max Length 64 characters" }
                    })} />
                <span>
                    {errors.password?.message}
                </span>
                <br />
                <button className={style.button}>Register</button>
            </form>
        </div>
    )
}
