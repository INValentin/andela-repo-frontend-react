import React from 'react'
import { Link } from 'react-router-dom'
import useApi from '../hooks/useApi'
import { useForm } from 'react-hook-form'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/Auth'

const Login = () => {
    const API = useApi()
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm({
        username: '',
        password: ''
    })
    const auth = useAuth();


    const handleLogin = (data) => {
        console.log(data)
        API.request(
            () => API.login(JSON.stringify(data)),
            (data) => {
                localStorage.setItem('isAdmin', String(data.isAdmin))
                localStorage.setItem('authToken', data.token)
                console.log(data)
                auth.refresh()
                if (!data.isAdmin) {
                    return navigate('/')
                }
                navigate('/dashboard')
            },
            "You have logged in successfully!"
        )
    }

    return (
        <form onSubmit={handleSubmit(handleLogin)} id="loginForm" action="" className="login">
            <h1 >Login</h1>
            <input {...register('username')} id="login-username" name="username" type="text" placeholder="username" />
            <input {...register('password')} id="login-password" name="password" type="password" placeholder="Password" />
            <button id="login-button" type="submit" className="btn"> Login</button>
            <div >
                <Link className="link" to="/">HOME</Link> |
                <Link className="link" to="/signup">Singup</Link>
            </div>
        </form>
    )
}

export default Login