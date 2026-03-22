import React, { useEffect } from 'react'
import style from "./Auth.module.scss"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../store/AuthReducer'
import { useNavigate } from 'react-router-dom'
import { IoLogIn } from "react-icons/io5"


export default function Login() {
    const dispatch = useDispatch()
    const { loading, error, token } = useSelector(state => state.auth)
    const navigate = useNavigate()
    
    const { register, handleSubmit, formState: { errors } } = useForm()

    useEffect(() => {
        if (token) {
            navigate('/')
        }
    }, [token, navigate])

    const onSubmit = async (data) => {
        try {
            await dispatch(loginUser(data)).unwrap()
            navigate('/')
        } catch (err) {
            console.error('Login error:', err)
        }
    }

    return (
        <div className={style.wrapper}>
            <div className={style.card}>
                <h1>Welcome Back</h1>
                <p className={style.subtle}>Sign in to your calendar account</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id='email' 
                        placeholder="your@email.com"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
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
                            required: "Password is required",
                            minLength: { 
                                value: 6, 
                                message: "Min length 6 characters" 
                            }
                        })}
                    />
                    <span className={style.error}>{errors.password?.message}</span>
                    
                    {error && (
                        <div className={style.error} style={{ marginTop: '0.5rem' }}>
                            {error}
                        </div>
                    )}
                    
                    <button type="submit" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'} 
                        <IoLogIn className="btn-icon" />
                    </button>
                </form>
            </div>
        </div>
    )
}
