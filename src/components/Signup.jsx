import React from 'react'
import { Link } from 'react-router-dom'
import useApi from '../hooks/useApi'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

const Signup = () => {
    const API = useApi()
    const { register, handleSubmit } = useForm({
        fullName: '',
        username: '',
        password: ''
    })


    const handleCreateUser = (data) => {
        if (data?.password.length < 6) {
            toast.error("Password must be at least 6 characters!")
            return;
        }
        console.log(data)
        API.request(
            () => API.users.create(JSON.stringify(data)),
            (user) => console.log(user),
            "User created successfully!"
        )
    }

    return (
        <form onSubmit={handleSubmit(handleCreateUser)} id="signup-form" action="" className="login">
            <h1 >Signup</h1>
            <input {...register('fullName')} id="fullname" type="text" placeholder="Full name" />
            <input {...register('username')} id="username" type="text" placeholder="username" />
            <input {...register('password')} id="password" type="password" placeholder="Password" />
            <button id="login-button" type="submit" className="btn">Signup</button>
            <Link to="/login" className="link">Login</Link>
        </form>
    )
}

export default Signup