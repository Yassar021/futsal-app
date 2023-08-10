import { configureStore } from "@reduxjs/toolkit";
import vanue from "./reducers/vanue";

export const store = configureStore({
    reducer: {
        vanue
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;