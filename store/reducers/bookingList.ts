import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BookingRequest } from "../../types/challenge";
import { RootState } from "..";
import { getVenueBookingList } from "../../services/API/venue";

interface InitialState {
    list: BookingRequest[];
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

export const fetchInitialList = createAsyncThunk("fetch/bookinglist/initial",async (arg,{getState}) => {
    const state = getState() as RootState;
    const venueId = state.account.userInfo.data.id

    const response = await getVenueBookingList(venueId, {
        page: 1,
        size: 10
    });

    return response
})


export const fetchNextPageList = createAsyncThunk("fetch/bookinglist/next", async (arg, {getState}) => {
    const state = getState() as RootState;
    const venueId = state.account.userInfo.data.id
    const page = state.bookingList.page;

    if (state.bookingList.hasEnded || state.bookingList.isLoading) {
        return;
    }

    const response = await getVenueBookingList(venueId, {
        page: page + 1,
        size: 10
    });

    return response
})

const bookingListSlice = createSlice({
    initialState,
    name: "bookingSlice",
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(fetchInitialList.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchInitialList.fulfilled, (state,action) => {
            state.isLoading = false;
            state.hasEnded = false;
            state.page = 1;
            if (action.payload) {
                state.list = action.payload.data
            }
        })
        .addCase(fetchNextPageList.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchNextPageList.fulfilled, (state,action) => {
            state.isLoading = false;
            if (action.payload?.data) {
                state.hasEnded = action.payload.next_page_url === null;
                state.page = state.page + 1;
                state.list = [
                    ...state.list,
                    ...action.payload.data
                ]
            }
        })
    }
})

export default bookingListSlice.reducer;