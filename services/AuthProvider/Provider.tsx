import React, { useEffect, useMemo, useState } from 'react'
import { AuthContext } from "./context";
import { teamLogin, venueLogin } from '../auth';
import { useAppDispatch } from '../../store/hooks';
import { clearAccount, setAccount, setFetchingDone } from '../../store/reducers/account';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { AccountType } from '../../types/user';
import { getAccountInfo } from '../API/team';
import { Spinner } from '@chakra-ui/react';

const AuthProvider = ({ children }) => {
    const [isLogged,setLogged] = useState(false)
    const [token,setToken] = useState("");

    const dispatch = useAppDispatch();
    const isUserFetching = useSelector((state: RootState) => state.account.isFetching);
    const accountType = useSelector((state: RootState) => state.account.userInfo?.type)

    const login = async (email: string, password: string, type: AccountType = AccountType.TEAM) => {
        let result;

        if (type === AccountType.TEAM) {
            result = await teamLogin({
                email,
                password
            })
        } else {
            result = await venueLogin({
                email,
                password
            })
        }


        if (result.success) {
            localStorage.setItem("token",result.data.token)
            setToken(result.data.token);
            setLogged(true)
            dispatch(setAccount({
                type: type,
                data: type === AccountType.TEAM ? result.data.team : result.data.venue
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

    const fetchUserInfo = () => {
        getAccountInfo().then((userInfo) => {
            dispatch(setAccount(userInfo))
            dispatch(setFetchingDone())
        })
    }

    const contextValue = useMemo(() => {
        return {
            isLogged,
            token,
            type: accountType,
            login,
            logout,
            fetchUserInfo
        }
    },[isLogged, token,accountType])


    useEffect(() => {
        let savedToken = localStorage.getItem("token");
        if (savedToken) {
            setLogged(true)
            setToken(savedToken)
            fetchUserInfo();
        }else{
            dispatch(setFetchingDone())
        }
    },[])

    if (isUserFetching) {
        return <Spinner />
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider