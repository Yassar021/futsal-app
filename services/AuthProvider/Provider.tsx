import React, { useEffect, useMemo, useState } from 'react'
import { AuthContext } from "./context";
import { teamLogin } from '../auth';

const AuthProvider = ({ children }) => {
    const [isLogged,setLogged] = useState(false)
    const [token,setToken] = useState("");

    const login = async (email: string, password: string) => {
        let result = await teamLogin({
            email,
            password
        })

        if (result.success) {
            localStorage.setItem("token",result.data.token)
            setToken(result.data.token);
            setLogged(true)
        }

        return result;
    }

    const contextValue = useMemo(() => {
        return {
            isLogged,
            token,
            login
        }
    },[isLogged, token])


    useEffect(() => {
        let savedToken = localStorage.getItem("token");
        if (savedToken) {
            setLogged(true)
            setToken(savedToken)
        }
    },[])

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider