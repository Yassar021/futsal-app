import { configureStore } from "@reduxjs/toolkit";
import vanue from "./reducers/vanue";
import team from "./reducers/team";
import matchHistory from "./reducers/matchHistory";

export const store = configureStore({
    reducer: {
        vanue,
        team,
        matchHistory,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;