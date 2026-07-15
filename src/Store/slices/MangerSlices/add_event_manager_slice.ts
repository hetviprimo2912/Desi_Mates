import { createSlice } from "@reduxjs/toolkit";
import { add_event_manager } from "./add_event_manager_thunk";
import type { AddEventManagerState } from "../../../Types/ManagerTypes/add_event_manager_types";

const initialState: AddEventManagerState = {
    loading: false,
    error: null,
    success: false,
};

const addEventManagerSlice = createSlice({
    name: "add_event_manager",
    initialState,
    reducers: {
        resetAddEventManager(state) {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(add_event_manager.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(add_event_manager.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(add_event_manager.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });
    },
});

export const { resetAddEventManager } = addEventManagerSlice.actions;
export default addEventManagerSlice.reducer;
