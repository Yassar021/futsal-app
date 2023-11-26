import { AnyAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addBooking, deleteBooking, getVenueBookingSlots, updateBooking } from "../../services/API/venue";
import { BookingSlot } from "../../types/type";
import { BookingInfo } from "../../types/booking";
import { RootState } from "..";
import { BookingSubmit } from "../../types/request";

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


export const fetchUpdateBooking = createAsyncThunk("fetch/booking/update",async ({ booking_id, payload }:{booking_id: number,payload: BookingSubmit},{dispatch, getState}) => {
    const response = await updateBooking(booking_id,payload);
})

export const fetchDeleteBooking = createAsyncThunk("fetch/booking/delete",async (booking_id: number) => {
    const response = await deleteBooking(booking_id)
})

export const fetchAddBooking = createAsyncThunk("fetch/booking/add",async (payload: BookingSubmit) => {
    const response = await addBooking(payload);
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