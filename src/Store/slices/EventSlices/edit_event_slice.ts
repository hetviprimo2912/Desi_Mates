import { createSlice } from "@reduxjs/toolkit";

import { edit_event } from "./edit_event_thunk";
import { get_event_details } from "./get_event_details_thunk";

import type {
    EditEventState,
} from "../../../Types/EventTypes/edit_event_types";

const initialState: EditEventState = {
    loading: false,
    error: null,
    event: null,
};

const editEventSlice = createSlice({
    name: "edit_event",

    initialState,

    reducers: {},

    extraReducers: (builder) => {

        builder

            .addCase(
                get_event_details.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                get_event_details.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.event =
                        action.payload.event;
                }
            )

            .addCase(
                get_event_details.rejected,
                (state, action) => {
                    state.loading = false;

                    state.error =
                        action.payload ||
                        "Something went wrong";
                }
            )

            .addCase(
                edit_event.pending,
                (state) => {
                    state.error = null;
                }
            )

            .addCase(
                edit_event.fulfilled,
                (state, action) => {
                    state.event =
                        action.payload.event;
                }
            )

            .addCase(
                edit_event.rejected,
                (state, action) => {
                    state.error =
                        action.payload ||
                        "Something went wrong";
                }
            );

    },
});

export default editEventSlice.reducer;