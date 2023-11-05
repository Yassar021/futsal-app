import { AnyAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Challenge, ChallengeItem } from "../../types/challenge";
import { getReceivedChallenge } from "../../services/API/team";
import { getChallengeDetail, acceptChallenge as acceptChallengeApi, rejectChallenge as rejectChallengeApi } from "../../services/API/challenge";

interface InitialState {
    list: ChallengeItem[];
    selected: Challenge | null;
    isLoading: boolean;
    selectedLoading: boolean;
    statusLoading: boolean;
}

const initialState: InitialState = {
    list: [],
    isLoading: false,
    selected: null,
    selectedLoading: true,
    statusLoading: false,
}


export const fetchChallanges = createAsyncThunk("fetch/challenge/received",async () => {
    const response = await getReceivedChallenge()

    return response;
})

export const setSelected = createAsyncThunk("fetch/challenge/received/detail",async (challengeId: string | number) => {
    const response = await getChallengeDetail(challengeId);

    return response;
})

export const acceptChallenge = createAsyncThunk("fetch/challenge/received/accept",async (challengeId: string | number, {dispatch}) => {
    const response = await acceptChallengeApi(challengeId);

    return dispatch(fetchChallanges());
})

export const rejectChallenge = createAsyncThunk("fetch/challenge/received/reject",async (challengeId: string | number, {dispatch}) => {
    const response = await rejectChallengeApi(challengeId);

    return dispatch(fetchChallanges());
})

export const challengeReceivedSlice = createSlice({
    initialState,
    name: 'challengeReceived',
    reducers: {

    },
    extraReducers: builder => {
        builder
        .addCase(fetchChallanges.pending,(state,action) => {
            state.isLoading = true;
        })
        .addCase(fetchChallanges.fulfilled,(state, action) => {
            state.isLoading = false;
            state.list = action.payload
        })
        .addCase(setSelected.pending, (state) => {
            state.selectedLoading = true;
        })
        .addCase(setSelected.fulfilled, (state,action) => {
            state.selectedLoading = false;
            state.selected = action.payload
        })
        .addMatcher(
            (action: AnyAction) => action.type.endsWith("received/reject/pending") || action.type.endsWith("received/accept/pending"),
            (state) => {
                state.statusLoading = true;
            }
        )
        .addMatcher(
            (action: AnyAction) => action.type.endsWith("received/reject/fulfilled") || action.type.endsWith("received/accept/fulfilled"),
            (state) => {
                state.statusLoading = false;
            }
        )
    }
});

export default challengeReceivedSlice.reducer;