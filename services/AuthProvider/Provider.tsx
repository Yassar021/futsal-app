import React, { useEffect, useMemo, useState } from 'react'
import { AuthContext } from "./context";
import { teamLogin } from '../auth';
import { useAppDispatch } from '../../store/hooks';
import { clearAccount, setAccount, setFetchingDone } from '../../store/reducers/account';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { AccountType } from '../../types/user';
import { getAccountInfo } from '../API/team';

const AuthProvider = ({ children }) => {
    const [isLogged,setLogged] = useState(false)
    const [token,setToken] = useState("");

    const dispatch = useAppDispatch();
    const isUserFetching = useSelector((state: RootState) => state.account.isFetching);

    const login = async (email: string, password: string, type: AccountType = AccountType.TEAM) => {
        let result = await teamLogin({
            email,
            password
        })

        if (result.success) {
            localStorage.setItem("token",result.data.token)
            setToken(result.data.token);
            setLogged(true)
            dispatch(setAccount({
                type: type,
                data: type === "team" ? result.data.team : result.data.team
            }))
        }

        return result;
    }

    const logout = () => {
        localStorage.removeItem("token");
        setLogged(false);
        setToken("");
        dispatch(clearAccount())
    }

    const contextValue = useMemo(() => {
        return {
            isLogged,
            token,
            login,
            logout
        }
    },[isLogged, token])


    useEffect(() => {
        let savedToken = localStorage.getItem("token");
        if (savedToken) {
            setLogged(true)
            setToken(savedToken)
            getAccountInfo().then((userInfo) => {
                dispatch(setAccount(userInfo))
                dispatch(setFetchingDone())
            })
        }else{
            dispatch(setFetchingDone())
        }
    },[])

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider