import { createSlice } from "@reduxjs/toolkit";
import { delete_starsign } from "./delete_starsign_thunk";
import type { DeleteStarSignState } from "../../../Types/StarTypes/delete_starsign_types";

const initialState: DeleteStarSignState = {
    loading: false,
    error: null,
    success: false,
};

const deleteStarsignSlice = createSlice({
    name: "delete_starsign",
    initialState,
    reducers: {
        resetDeleteStarsign(state) {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(delete_starsign.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(delete_starsign.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(delete_starsign.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });
    },
});

export const { resetDeleteStarsign } = deleteStarsignSlice.actions;
export default deleteStarsignSlice.reducer;
