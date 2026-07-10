import { createSlice } from "@reduxjs/toolkit";
import { starsign_card } from "./starsign_card_thunk";
import type { StarsignCardState } from "../../../Types/StarTypes/starsign_card_types";

const initialState: StarsignCardState = {
    loading: false,
    error: null,
    data: null,
};

const starsignCardSlice = createSlice({
    name: "starsign_card",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(starsign_card.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(starsign_card.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
            })
            .addCase(starsign_card.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });
    },
});

export default starsignCardSlice.reducer;
