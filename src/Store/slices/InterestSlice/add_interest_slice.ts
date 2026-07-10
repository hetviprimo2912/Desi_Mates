import { createSlice } from "@reduxjs/toolkit";
import { add_interest } from "./add_interest_thunk";
import type { AddInterestState } from "../../../Types/InterestTypes/add_interest_types";

const initialState: AddInterestState = {
    loading: false,
    error: null,
};

const addInterestSlice = createSlice({
    name: "add_interest",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(add_interest.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(add_interest.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(add_interest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });
    },
});

export default addInterestSlice.reducer;
