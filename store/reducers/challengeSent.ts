import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Challenge, ChallengeItem } from "../../types/challenge";
import { getSentChallenge } from "../../services/API/team";
import { getChallengeDetail, updateChallenge as updateChallengeApi, deleteChallenge as deleteChallengeApi } from "../../services/API/challenge";
import { UpdateChallengeRequest } from "../../types/request";

interface ChallengeSentState {
    list: ChallengeItem[];
    isLoading: boolean;
    selected: Challenge | null;
    selectedLoading: boolean;
}

const initialState: ChallengeSentState = {
    list: [],
    isLoading: false,
    selected: null,
    selectedLoading: false,
}


export const fetchChallanges = createAsyncThunk("fetch/challenge/sent",async () => {
    const response = await getSentChallenge()

    return response;
})

export const setSelectedChallenge = createAsyncThunk("fetch/challenge/detail",async (challengeId: string | number) => {
    const response = await getChallengeDetail(challengeId);

    return response;
})

export const updateChallenge = createAsyncThunk("update/challenge",async (param: {id: string | number,payload: UpdateChallengeRequest}, {dispatch}) => {
    const response = await updateChallengeApi(param.id,param.payload)

    return dispatch(fetchChallanges())
})

export const deleteChallenge = createAsyncThunk("delete/challenge", async (challengeId: string | number, {dispatch}) => {
    const response = await deleteChallengeApi(challengeId);

    return dispatch(fetchChallanges());
})

export const challengeSentSlice = createSlice({
    initialState,
    name: "challengeSent",
    reducers: {

    },
    extraReducers: builder => {
        builder.addCase(fetchChallanges.pending,(state,action) => {
            state.isLoading = true;
        })
        .addCase(fetchChallanges.fulfilled,(state,action) => {
            state.isLoading = false;
            state.list = action.payload
        })
        .addCase(setSelectedChallenge.pending,(state,action) => {
            state.selectedLoading = true;
        })
        .addCase(setSelectedChallenge.fulfilled,(state,action) => {
            state.selectedLoading = false;
            if (action.payload?.id) {
                state.selected = action.payload
            }
        }).addCase(updateChallenge.pending, (state) => {
            state.selectedLoading = true;
        }).addCase(updateChallenge.fulfilled, (state) => {
            state.selectedLoading = false
        }).addCase(deleteChallenge.pending, (state) => {
            state.selectedLoading = true;
        }).addCase(deleteChallenge.fulfilled, (state) => {
            state.selectedLoading = false;
        })
    }
})


export default challengeSentSlice.reducer