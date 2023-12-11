import { useContext } from "react";
import { AuthContext } from "./context";
import { UserSession } from "./types";

export function useLogin() {
    const ctx = useContext(AuthContext)

    return ctx.login;
}

export function useLogout() {
    const ctx = useContext(AuthContext);

    return ctx.logout
}

export function useUser(): UserSession & {refetch: () => void} {
    const ctx = useContext(AuthContext);

    return {
        isLogged: ctx.isLogged,
        token: ctx.token,
        type: ctx.type,
        refetch: ctx.fetchUserInfo,
    }
}