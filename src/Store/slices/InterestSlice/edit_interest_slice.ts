import { createSlice } from "@reduxjs/toolkit";
import { edit_interest } from "./edit_interest_thunk";
import { get_interest_details } from "./get_interest_details_thunk";
import type { EditInterestState } from "../../../Types/InterestTypes/edit_interest_types";

const initialState: EditInterestState = {
    loading: false,
    error: null,
    interest: null,
};

const editInterestSlice = createSlice({
    name: "edit_interest",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(get_interest_details.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(get_interest_details.fulfilled, (state, action) => {
                state.loading = false;
                state.interest = action.payload.interest;
            })
            .addCase(get_interest_details.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            })
            .addCase(edit_interest.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(edit_interest.fulfilled, (state, action) => {
                state.loading = false;
                state.interest = action.payload.interest;
            })
            .addCase(edit_interest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });
    },
});

export default editInterestSlice.reducer;
