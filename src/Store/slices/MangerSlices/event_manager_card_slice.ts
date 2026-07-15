import { createSlice } from "@reduxjs/toolkit";

import { event_manager_card } from "./event_manager_card_thunk";

import type {
    EventManagerCardState,
} from "../../../Types/ManagerTypes/event_manager_card_types";

const initialState: EventManagerCardState = {
    loading: false,
    error: null,

    data: null,
};

const eventManagerCardSlice = createSlice({
    name: "event_manager_card",

    initialState,

    reducers: {},

    extraReducers: (builder) => {
        builder

            .addCase(event_manager_card.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(event_manager_card.fulfilled, (state, action) => {
                state.loading = false;

                state.data = action.payload.data;
            })

            .addCase(event_manager_card.rejected, (state, action) => {
                state.loading = false;

                state.error =
                    action.payload || "Something went wrong";
            });
    },
});

export default eventManagerCardSlice.reducer;