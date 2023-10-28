import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TeamInfo } from "../../types/user";

type FindTeamState = {
    list: TeamInfo[];
    page: number;
    isEnd: boolean;
    isLoading: boolean;
}

const initialState: FindTeamState = {
    list: [],
    page: 1,
    isEnd: false,
    isLoading: false
}

export const findTeamSlice = createSlice({
    name: "findTeam",
    initialState,
    reducers: {
        initialLoad: (state, action: PayloadAction<TeamInfo[]>) => {
            state.list = action.payload;
            state.page = 1;
            state.isEnd = false;
        },
        nextPage: (state, action: PayloadAction<TeamInfo[]>) => {
            if(!state.isEnd){
                state.page = state.page + 1;
                state.list = [...state.list, ...action.payload];
            }
        },
        hasEnded: (state) => {
            state.isEnd = true;
        }
    }
});

export const { initialLoad, nextPage, hasEnded } = findTeamSlice.actions;

export default findTeamSlice.reducer;