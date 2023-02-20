import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';


const AuthContext = React.createContext({})

export const useAuth = () => React.useContext(AuthContext);


const AuthProvider = (props) => {
    const [isAdmin, setIsAdmin] = useState(false)
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        setIsAdmin(localStorage.getItem('isAdmin') === 'true')
        setIsActive(localStorage.getItem('authToken')?.length > 5);
    })

    const refresh = () => {
        setIsAdmin(localStorage.getItem('isAdmin') === 'true')
        setIsActive(localStorage.getItem('authToken')?.length > 5);
    }

    const handleLogout = () => {
        window.localStorage.removeItem('isAdmin');
        window.localStorage.removeItem('authToken');
        setIsAdmin(false)
        setIsActive(false)
    }

    return (
        <AuthContext.Provider value={{ isAdmin, refresh, logout: handleLogout, isActive }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;