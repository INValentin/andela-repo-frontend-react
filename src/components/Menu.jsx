import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { useAuth } from '../context/Auth'


const Menu = () => {
    const auth = useAuth();
    const [open, setOpen] = useState(false)

    return (
        <header>
            <button onClick={() => setOpen(true)} id="menu-btn"><ion-icon size="large" name="menu"></ion-icon></button>
            <nav className={open ? 'flex' : 'hidden md:flex'}>
                <button onClick={() => setOpen(false)}  className='p-2 md:hidden flex bg-red-500 rounded-full border-0 text-white m-1 items-center justify-center mx-auto'> <ion-icon size="large" name="close-circle-outline"></ion-icon></button>

                <ul>
                    <li><Link className="active" to="/">Home</Link></li>
                    <li><Link to="/portifolio">Portifolio</Link></li>
                    <li><Link to="/blog">Blog</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>
                <ul id="ul-btn-nav">
                    {auth.isAdmin && <li>
                        <Link to="/dashboard" className="nav-btn">Dashboard</Link>
                    </li>}
                    {auth.isActive ?
                        <li>
                            <Link onClick={auth.logout} to="/login" className="nav-btn">Logout</Link>
                        </li>
                        :
                        <>
                            <li>
                                <Link to="/login" className="nav-btn">Login</Link>
                            </li>
                            <li>
                                <Link className="nav-btn" to="/signup">Signup</Link>
                            </li>
                        </>
                    }
                </ul>
            </nav>
        </header>
    )
}

export default Menu