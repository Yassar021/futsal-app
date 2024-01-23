import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { VenueInfo } from "../../types/user";
import { RootState } from "..";
import { getVenueList } from "../../services/API/venue";

interface InitialState {
    list: VenueInfo[]
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


export const fetchInitialVenueList = createAsyncThunk("fetch/venue/list",(arg,{getState}) => {
    const state = getState() as RootState;
    const response = getVenueList({
        page: state.venue.page,
        size: 10
    })

    return response
})

export const fetchVenueNextList = createAsyncThunk("fetch/venue/list/next",(arg,{getState}) => {
    const state = getState() as RootState;

    if (state.venue.hasEnded) {
        return;
    }
    const response = getVenueList({
        page: state.venue.page + 1,
        size: 10
    })

    return response
})

const venueSlice = createSlice({
    initialState,
    name: "venue",
    reducers: {
        setToLoading: (state) => {
            state.isLoading = true;
        }
    },
    extraReducers: builder => {
        builder
        .addCase(fetchInitialVenueList.pending,(state) => {
            state.isLoading = true
            state.list = []
            state.hasEnded = false
        })
        .addCase(fetchInitialVenueList.fulfilled, (state,action) => {
            state.isLoading = false;
            state.list = action.payload.data
        })
        .addCase(fetchVenueNextList.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(fetchVenueNextList.fulfilled, (state,action) => {
            state.isLoading = false;
            if (action.payload) {
                state.page = action.payload.current_page
                state.list = [
                    ...state.list,
                    ...action.payload.data
                ]
                if (action.payload.next_page_url === null) {
                    state.hasEnded = true;
                }
            }
        })
    }
})

export const { setToLoading } = venueSlice.actions

export default venueSlice.reducer