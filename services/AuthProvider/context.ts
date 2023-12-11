import { createContext } from "react";
import { ValidationError } from "../../types/response";
import { AccountType } from "../../types/user";

type TAuthContext = {
    token: string;
    isLogged: boolean;
    type: AccountType | undefined;
    login: (username: string, password: string, type: AccountType) => Promise<any>;
    logout: () => void;
    fetchUserInfo: () => void
}

export const AuthContext = createContext<TAuthContext>({
    token: "",
    isLogged: false,
    type: undefined,
    login: () => new Promise(() => ({})),
    logout: () => {},
    fetchUserInfo: () => {}
})