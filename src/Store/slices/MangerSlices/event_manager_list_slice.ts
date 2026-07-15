import { createSlice } from "@reduxjs/toolkit";

import { event_manager_list } from "./event_manager_list_thunk";

import type {
    EventManagerListState,
} from "../../../Types/ManagerTypes/event_manager_list_types";

const initialState: EventManagerListState = {
    loading: false,
    error: null,

    event_manager: [],

    pagination: null,
};

const eventManagerListSlice = createSlice({
    name: "event_manager_list",

    initialState,

    reducers: {},

    extraReducers: (builder) => {
        builder

            .addCase(event_manager_list.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(event_manager_list.fulfilled, (state, action) => {
                state.loading = false;

                state.event_manager = action.payload.event_manager;

                state.pagination = action.payload.pagination;
            })

            .addCase(event_manager_list.rejected, (state, action) => {
                state.loading = false;

                state.error =
                    action.payload || "Something went wrong";
            });
    },
});

export default eventManagerListSlice.reducer;