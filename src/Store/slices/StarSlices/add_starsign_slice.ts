import { createSlice } from "@reduxjs/toolkit";
import { add_starsign } from "./add_starsign_thunk";
import type { AddStarSignState } from "../../../Types/StarTypes/add_starsign_types";

const initialState: AddStarSignState = {
    loading: false,
    error: null,
};

const addStarsignSlice = createSlice({
    name: "add_starsign",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(add_starsign.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(add_starsign.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(add_starsign.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });
    },
});

export default addStarsignSlice.reducer;
