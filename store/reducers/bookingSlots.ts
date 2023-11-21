import { AnyAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getVenueBookingSlots } from "../../services/API/venue";
import { BookingSlot } from "../../types/type";

interface InitialState {
    data: BookingSlot[];
    venueId: string | number;
    isLoading: boolean;
}

const initialState: InitialState = {
    data: [],
    venueId: "0",
    isLoading: false
}

export const fetchBookingSlots = createAsyncThunk("fetc/booking/slots",async ({venueId, fieldId} : {venueId: number,fieldId: number}) => {
    const respose = await getVenueBookingSlots(venueId,fieldId);

    return respose;
})

const bookingSlice = createSlice({
    initialState,
    name: "bookingSlice",
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(fetchBookingSlots.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchBookingSlots.fulfilled, (state,action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
    }
});

export default bookingSlice.reducer;