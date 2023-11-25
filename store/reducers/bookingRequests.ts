import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "..";
import { acceptVenueBookingRequests, getFieldVenue, getVenueBookingRequests, rejectVenueBookingRequests } from "../../services/API/venue";
import { Challenge } from "../../types/challenge";
import { VenueField } from "../../types/type";
import { AcceptBooking } from "../../types/request";

interface InitialState {
    list: Omit<Challenge,"venue">[],
    fields: VenueField[],
    isLoading: boolean
}


const initialState: InitialState = {
    list: [],
    fields: [],
    isLoading: false
}

export const fetchVenueFields = createAsyncThunk("fetch/venue/fields",async (arg,{getState}) => {
    const state = getState() as RootState;
    const venueId = state.account.userInfo.data.id

    const response = await getFieldVenue(venueId);

    return response;
})

export const fetchBookingRequests = createAsyncThunk("fetch/booking/request",async (arg,{getState}) => {
    const state = getState() as RootState;
    const venueId = state.account.userInfo.data.id

    const response = await getVenueBookingRequests(venueId)

    return response;
})

export const acceptBookingRequests = createAsyncThunk("fetch/booking/request/accept", async ({challenge_id, payload} : {challenge_id: number, payload: AcceptBooking},{getState, dispatch}) => {
    const state = getState() as RootState;
    const venueId = state.account.userInfo.data.id

    const response = await acceptVenueBookingRequests(
        venueId,
        challenge_id,
        payload
    )

    dispatch(fetchBookingRequests());
})

export const rejectBookingRequest = createAsyncThunk("fetch/booking/request/reject", async (challenge_id: number,{getState,dispatch}) => {
    const state = getState() as RootState;
    const venueId = state.account.userInfo.data.id

    const response = await rejectVenueBookingRequests(venueId,challenge_id);

    dispatch(fetchBookingRequests())
});

const bookingRequests = createSlice({
    initialState,
    name: "bookingRequests",
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(fetchBookingRequests.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(fetchBookingRequests.fulfilled, (state,action) => {
            state.isLoading = false;
            state.list = action.payload
        })
        .addCase(fetchVenueFields.fulfilled, (state,action) => {
            state.fields = action.payload;
        })
    }
})

export default bookingRequests.reducer;