import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./reducers/account";
import findTeams from "./reducers/findTeams";

export const store = configureStore({
    reducer: {
        account: accountReducer,
        findTeams: findTeams
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;