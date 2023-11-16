import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./reducers/account";
import findTeams from "./reducers/findTeams";
import challengeSent from "./reducers/challengeSent";
import challengeReceived from "./reducers/challengeReceived";
import schedule from "./reducers/schedule";
import histories from "./reducers/histories";


export const store = configureStore({
    reducer: {
        account: accountReducer,
        findTeams: findTeams,
        challengeSent: challengeSent,
        challengeReceived: challengeReceived,
        schedule: schedule,
        histories: histories
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;