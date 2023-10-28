import { createContext } from "react";
import { ValidationError } from "../../types/response";
import { AccountType } from "../../types/user";

type TAuthContext = {
    token: string;
    isLogged: boolean;
    login: (username: string, password: string, type: AccountType) => Promise<any>;
    logout: () => void;
}

export const AuthContext = createContext<TAuthContext>({
    token: "",
    isLogged: false,
    login: () => new Promise(() => ({})),
    logout: () => {}
})