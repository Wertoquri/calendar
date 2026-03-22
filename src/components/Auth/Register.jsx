import React, { useEffect } from 'react'
import style from "./Auth.module.scss"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../store/AuthReducer'
import { useNavigate } from 'react-router-dom'
import { IoPersonAdd } from "react-icons/io5"

export default function Register() {
    const dispatch = useDispatch()
    const { loading, error, token } = useSelector(state => state.auth)
    const navigate = useNavigate()
    
    const { register, handleSubmit, formState: { errors }, watch } = useForm()

    useEffect(() => {
        if (token) {
            navigate('/')
        }
    }, [token, navigate])

    const onSubmit = async (data) => {
        try {
            await dispatch(registerUser(data)).unwrap()
            navigate('/')
        } catch (err) {
            console.error('Registration error:', err)
        }
    }

    return (
        <div className={style.wrapper}>
            <div className={style.card}>
                <h1>Create Account</h1>
                <p className={style.subtle}>Join us and start organizing your schedule</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="login">Username</label>
                    <input 
                        type="text" 
                        id='login' 
                        placeholder="Choose a username"
                        {...register("login", {
                            required: "Username is required",
                            minLength: {
                                value: 3,
                                message: "Min length 3 characters"
                            },
                            maxLength: {
                                value: 20,
                                message: "Max length 20 characters"
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9]+$/,
                                message: "Only letters and numbers are allowed"
                            }
                        })}
                    />
                    <span className={style.error}>{errors.login?.message}</span>

                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id='email' 
                        placeholder="your@email.com"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^\S+@\S+\.\S+$/i,
                                message: "Invalid email address"
                            }
                        })}
                    />
                    <span className={style.error}>{errors.email?.message}</span>

                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id='password' 
                        placeholder="Create a strong password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: { 
                                value: 6, 
                                message: "Min length 6 characters" 
                            },
                            maxLength: {
                                value: 64,
                                message: "Max length 64 characters"
                            }
                        })}
                    />
                    <span className={style.error}>{errors.password?.message}</span>

                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input 
                        type="password" 
                        id='confirmPassword'
                        placeholder="Confirm your password"
                        {...register("confirmPassword", {
                            required: "Confirm password is required",
                            validate: (value) => {
                                if (value !== watch("password")) {
                                    return "Passwords do not match"
                                }
                            }
                        })}
                    />
                    <span className={style.error}>{errors.confirmPassword?.message}</span>

                    {error && (
                        <div className={style.error} style={{ marginTop: '0.5rem' }}>
                            {error}
                        </div>
                    )}

                    <button type="submit" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Create Account'} 
                        <IoPersonAdd />
                    </button>
                </form>
            </div>
        </div>
    )
}
