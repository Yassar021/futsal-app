import { useContext } from "react";
import { AuthContext } from "./context";
import { UserSession } from "./types";

export function useLogin() {
    const ctx = useContext(AuthContext)

    return ctx.login;
}

export function useUser(): UserSession {
    const ctx = useContext(AuthContext);

    return {
        isLogged: ctx.isLogged,
        token: ctx.token
    }
}