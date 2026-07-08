import { createSlice } from "@reduxjs/toolkit";
import { starsign_list } from "./starsign_list_thunk";
import type { StarSignListState } from "../../../Types/StarTypes/starsign_list_types";

const initialState: StarSignListState = {
    loading: false,
    error: null,
    starsign: [],
    pagination: null,
};

const starsignListSlice = createSlice({
    name: "starsign_list",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(starsign_list.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(starsign_list.fulfilled, (state, action) => {
                state.loading = false;
                state.starsign = action.payload.starsign;
                state.pagination = action.payload.pagination;
            })
            .addCase(starsign_list.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });
    },
});

export default starsignListSlice.reducer;
