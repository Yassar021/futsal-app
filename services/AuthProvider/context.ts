import { createContext } from "react";
import { ValidationError } from "../../types/response";

type TAuthContext = {
    token: string;
    isLogged: boolean;
    login: (username: string, password: string) => Promise<any>;
}

export const AuthContext = createContext<TAuthContext>({
    token: "",
    isLogged: false,
    login: () => new Promise(() => ({})),
})