import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { FetchStatus, TTeam } from "../../types/type"
import * as api from "../../services/graphql"

export const fetchTeams = createAsyncThunk<TTeam[], void, {}>(
  'team/fetchTeams',
  async (_,thunkApi) => {
    const result = await api.fetchTeams()
    return result.team
  }
)

type SliceState = {
  teams: TTeam[]
  status: FetchStatus
}

const initialState: SliceState = {
  teams: [],
  status: FetchStatus.IDLE
}

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTeams.pending, (state, action) => {
      state.status = FetchStatus.LOADING
    }).addCase(fetchTeams.fulfilled, (state, action) => {
      state.status = FetchStatus.IDLE
      state.teams = action.payload
    })
  }
})

export default teamSlice.reducer;

