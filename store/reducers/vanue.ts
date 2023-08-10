import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { FetchStatus, TVanue } from "../../types/type"
import * as api from "../../services/graphql"



// Thunk Action
export const fetchVanues = createAsyncThunk<TVanue[],void,{}>(
    'vanue/fetchVanues',
    async (_,thunkApi) => {
        const result = await api.fetchVanues()
        return result.vanue
    }
)


type SliceState = {
    vanues: TVanue[]
    status: FetchStatus
}

const initialState: SliceState = {
    vanues: [],
    status: FetchStatus.IDLE
}

const vanueSlice = createSlice({
    name: 'vanue',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchVanues.pending, (state,action) => {
            state.status = FetchStatus.LOADING
        }).addCase(fetchVanues.fulfilled, (state, action) => {
            state.status = FetchStatus.IDLE
            state.vanues = action.payload
        })
    }
})

export default vanueSlice.reducer;