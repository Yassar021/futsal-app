import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "../../types/user";


interface AccountState {
    isFetching: boolean;
    userInfo: UserInfo | null;
}

const initialState: AccountState = {
    isFetching: true,
    userInfo: null
}

export const AccountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setAccount: (state, action: PayloadAction<UserInfo>) => {
            state.userInfo = action.payload;
        },
        setFetchingDone: (state) => {
            state.isFetching = false
        },
        clearAccount: (state) => {
            state.userInfo = null
        }
    }
})

export const { setAccount, setFetchingDone, clearAccount } = AccountSlice.actions

export default AccountSlice.reducer;