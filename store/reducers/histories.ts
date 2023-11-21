import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GameResult, MatchHistory } from "../../types/schedule";
import { RootState } from "..";
import { getMatchHistories, setMatchResult } from "../../services/API/match";
import { SubmitGameResult } from "../../types/request";

interface InitialState {
    list: MatchHistory[];
    isLoading: boolean;
    page: number;
    hasEnded: boolean;
}

const initialState: InitialState = {
    list: [],
    isLoading: false,
    page: 1,
    hasEnded: false
}

export const fetchInitialList = createAsyncThunk("fetch/histories/initial",(arg,{getState,rejectWithValue}) => {
    const state = getState() as RootState;
    if (state.account.userInfo?.data.id) {
        const historiesState = state.histories;
        const response = getMatchHistories(state.account.userInfo.data.id.toString(),{
            page: historiesState.page,
            size: 10
        })

        return response;
    }else{
        rejectWithValue(null);
    }
})

export const updateScore = createAsyncThunk("update/histories/result",async ({team_id, match_id, result}: {team_id: number,match_id: number, result: SubmitGameResult}, {getState,dispatch}) => {
    const { histories } = getState() as RootState;
    const { page } = histories;

    const responseUpdate = await setMatchResult(team_id,match_id,result);

    dispatch(fetchInitialList());
})

const historiesSlice = createSlice({
    initialState,
    name: "histories",
    reducers: {

    },
    extraReducers: builder => {
        builder
        .addCase(fetchInitialList.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchInitialList.fulfilled, (state,action) => {
            state.isLoading = false;
            if (action.payload) {            
                state.list = action.payload.data;

                if (!action.payload.next_page_url) {
                    state.hasEnded = true;    
                }
            }
        })
    }
})


export default historiesSlice.reducer;