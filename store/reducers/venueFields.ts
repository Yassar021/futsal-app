import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { VenueField } from "../../types/type";
import { RootState } from "..";
import { getFieldVenue } from "../../services/API/venue";
import { addField, deleteField, editField, getFieldTypes } from "../../services/API/fields";

type InitialState = {
    list: VenueField[];
    types: {id: number, name: string}[],
    isLoading: boolean;
    selectedFieldId: number; 
}


const initialState: InitialState = {
    list: [],
    types: [],
    isLoading: false,
    selectedFieldId: 0
}

export const fetchField = createAsyncThunk("fetch/field/list",async (arg, {getState}) => {
    const state = getState() as RootState;
    const venueId = state.account.userInfo.data.id

    const res = await getFieldVenue(venueId);

    return res;
})

export const fetchFieldTypes = createAsyncThunk("fetch/field/type/list", async () => {
    const res = await getFieldTypes();

    return res;
})

export const fetchAddField = createAsyncThunk("fetch/field/add",async (arg: {name: string, type_id: number},{dispatch}) => {
    const res = await addField(arg);

    dispatch(fetchField());
})

export const fetchEditField = createAsyncThunk("fetch/field/edit",async (arg: {id: number, name: string, type_id: number},{dispatch}) => {
    const res = await editField(arg);

    dispatch(fetchField());
})

export const fetchDeleteField = createAsyncThunk("fetch/field/delete", async (field_id: number,{dispatch}) => {
    const res = await deleteField(field_id);

    dispatch(fetchField());
})

const venueFieldSlice = createSlice({
    name: "venueField",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(fetchField.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchField.fulfilled, (state,action) => {
            state.isLoading = false;
            state.list = action.payload
        })
        .addCase(fetchFieldTypes.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchFieldTypes.fulfilled, (state,action) => {
            state.isLoading = false;
            state.types = action.payload
        })
    }
})

export default venueFieldSlice.reducer;