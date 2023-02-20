import React from 'react'
import {
    Outlet
} from 'react-router-dom'
import Menu from './Menu'
import { Toaster } from 'react-hot-toast'

const Layout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <Toaster position='top-center' containerClassName='mt-14 border border-black'  />
            <Menu />
            <main className='flex-1'>
                <Outlet />
            </main>
            <footer>
                <span>&copy; ISHIMWE, 2022</span>
            </footer>
        </div>
    )
}

export default Layout