import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Match } from "../../types/schedule";
import { getLatestSchedules } from "../../services/API/match";
import { RootState } from "..";

interface InitialState {
    list: Match[];
    isLoading: boolean;
    page: number;
    hasEnded: boolean;
}

const initialState: InitialState = {
    list: [],
    isLoading: false,
    page: 1,
    hasEnded: false,
}

export const loadInitialList = createAsyncThunk("fetch/schedule/initial",(arg,{getState,rejectWithValue}) => {
    const state = getState() as RootState;
    if (state.account.userInfo?.data.id) {
        const scheduleState = state.schedule;
        const response = getLatestSchedules(state.account.userInfo.data.id.toString(),{
            page: scheduleState.page,
            size: 10
        })

        return response;
    }else{
        rejectWithValue(null);
    }
})

export const fetchNextPage = createAsyncThunk("fetch/schedule/next", (arg, {getState, rejectWithValue}) => {
    const state = getState() as RootState;
    if (state.schedule.hasEnded) {
        return;
    }
    if (state.account.userInfo?.data.id) {
        const scheduleState = state.schedule;
        const response = getLatestSchedules(state.account.userInfo.data.id.toString(),{
            page: scheduleState.page + 1,
            size: 10
        })

        return response;
    }else{
        rejectWithValue(null);
    }
})

const scheduleSlice = createSlice({
    initialState,
    name: "schedule",
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(loadInitialList.pending,(state) => {
            state.isLoading = true;
            state.list = [];
            state.hasEnded = false;
        })
        .addCase(loadInitialList.fulfilled,(state,action) => {
            state.isLoading = false;
            if (action.payload) {
                state.list = action.payload.data
            }
        })
        .addCase(fetchNextPage.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(fetchNextPage.fulfilled, (state,action) => {
            state.page = state.page + 1;
            state.isLoading = false;
            if (action.payload) {
                state.list = [
                    ...state.list,
                    ...action.payload.data
                ]
                if (!action.payload.next_page_url) {
                    state.hasEnded = true;
                }
            }
        })
    }
});

export const {  } = scheduleSlice.actions

export default scheduleSlice.reducer