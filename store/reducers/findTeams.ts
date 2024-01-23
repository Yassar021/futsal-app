import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TeamInfo } from "../../types/user";
import { RootState } from "..";
import { getAvailableTeams } from "../../services/API/team";

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

export const fetchInitialTeamList = createAsyncThunk("fetch/team/list",(arg,{getState}) => {
    const response = getAvailableTeams({
        page: 1,
        size: 10
    })

    return response;
})

export const fetchNextTeamList = createAsyncThunk("fetch/team/list/next", (arg, {getState}) => {
    const state = getState() as RootState;

    if (state.findTeams.isEnd) {
        return;
    }

    const response = getAvailableTeams({
        page: state.findTeams.page + 1,
        size: 10
    })

    return response;
})

export const findTeamSlice = createSlice({
    name: "findTeam",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchInitialTeamList.pending, (state) => {
            state.isLoading = true;
            state.list = [];
            state.isEnd = false;
            state.page = 1
        })
        .addCase(fetchInitialTeamList.fulfilled, (state,action) => {
            state.isLoading = false;
            state.list = action.payload.data
        })
        .addCase(fetchNextTeamList.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(fetchNextTeamList.fulfilled, (state,action) => {
            state.isLoading = false;
            if (action.payload) {
                state.page = action.payload.current_page,
                state.list = [
                    ...state.list,
                    ...action.payload.data
                ]
                if (action.payload.next_page_url === null) {
                    state.isEnd = true;
                }
            }
        })
    }
});

export const {  } = findTeamSlice.actions;

export default findTeamSlice.reducer;