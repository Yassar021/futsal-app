import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { FetchStatus, TMatchHistory } from "../../types/type"
import * as api from "../../services/graphql"

export const fetchMatchResult = createAsyncThunk<TMatchHistory[], void, {}>(
  'team/matchResult',
  async (_,thunkApi) => {
    const result = await api.fetchMatchHistory()
    return result.match
  }
)

type SliceState = {
  matchHistorys: TMatchHistory[]
  status: FetchStatus
}

const initialState: SliceState = {
  matchHistorys: [],
  status: FetchStatus.IDLE
}

const matchHistorySlice = createSlice({
  name: 'matchHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMatchResult.pending, (state, action) => {
      state.status = FetchStatus.LOADING
    }).addCase(fetchMatchResult.fulfilled, (state, action) => {
      state.status = FetchStatus.IDLE
      state.matchHistorys = action.payload
    })
  }
})

export default matchHistorySlice.reducer;