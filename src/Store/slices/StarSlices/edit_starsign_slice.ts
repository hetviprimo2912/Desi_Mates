import { createSlice } from "@reduxjs/toolkit";
import { edit_starsign } from "./edit_starsign_thunk";
import { get_starsign_details } from "./get_starsign_details_thunk";
import type { EditStarSignState } from "../../../Types/StarTypes/edit_starsign_types";

const initialState: EditStarSignState = {
    loading: false,
    error: null,
    starsign: null,
};

const editStarsignSlice = createSlice({
    name: "edit_starsign",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(get_starsign_details.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(get_starsign_details.fulfilled, (state, action) => {
                state.loading = false;
                state.starsign = action.payload.starsign;
            })
            .addCase(get_starsign_details.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            })
            .addCase(edit_starsign.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(edit_starsign.fulfilled, (state, action) => {
                state.loading = false;
                state.starsign = action.payload.starsign;
            })
            .addCase(edit_starsign.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });
    },
});

export default editStarsignSlice.reducer;
