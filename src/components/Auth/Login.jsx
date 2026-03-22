import React, { useEffect } from 'react'
import style from "./Auth.module.scss"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/AuthReducer';
import { useNavigate } from 'react-router-dom';
import { IoLogIn } from "react-icons/io5";


export default function Login() {
    const dispatch = useDispatch();
    let { loading, error, token } = useSelector(state => state.auth)

    let navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, watch } = useForm()

    useEffect(() => {
        if(error){
            alert(error)
        }
        if(token){
            navigate('/');
        }
    }, [token, error])

    return (
        <div className={style.wrapper}>
            <div className={style.card}>
                <h1>Welcome Back</h1>
                <p className={style.subtle}>Sign in to your calendar account</p>
                <form onSubmit={handleSubmit((data) => dispatch(loginUser(data)))}>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id='email' 
                        placeholder="your@email.com"
                        {...register("email", {
                            required: {
                                value: true,
                                message: "Email is required"
                            },
                            pattern: {
                                value: /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/,
                                message: "Invalid email address"
                            }
                        })}
                    />
                    <span className={style.error}>{errors.email?.message}</span>

                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id='password' 
                        placeholder="Enter your password"
                        {...register("password", {
                            required: { value: true, message: "Password is required" },
                            minLength: { value: 6, message: "Min length 6 characters" },
                            maxLength: { value: 64, message: "Max Length 64 characters" }
                        })}
                    />
                    <span className={style.error}>{errors.password?.message}</span>
                    
                    <button type="submit" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'} <IoLogIn style={{ verticalAlign: 'middle', marginLeft: '0.5rem' }} />
                    </button>
                </form>
            </div>
        </div>
    )
}
