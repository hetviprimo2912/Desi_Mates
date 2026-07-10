import { createSlice } from "@reduxjs/toolkit";
import { delete_interest } from "./delete_interest_thunk";
import type { DeleteInterestState } from "../../../Types/InterestTypes/delete_interest_types";

const initialState: DeleteInterestState = {
    loading: false,
    error: null,
    success: false,
};

const deleteInterestSlice = createSlice({
    name: "delete_interest",
    initialState,
    reducers: {
        resetDeleteInterest(state) {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(delete_interest.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(delete_interest.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(delete_interest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });
    },
});

export const { resetDeleteInterest } = deleteInterestSlice.actions;
export default deleteInterestSlice.reducer;
