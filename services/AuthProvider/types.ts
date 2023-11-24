import { AccountType } from "../../types/user";

export type UserSession = {
    isLogged: boolean,
    token: string;
    type: AccountType | undefined
}