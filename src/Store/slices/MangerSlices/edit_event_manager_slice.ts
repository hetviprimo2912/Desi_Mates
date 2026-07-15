import { createSlice } from "@reduxjs/toolkit";
import { edit_event_manager } from "./edit_event_manager_thunk";
import type { EditEventManagerState } from "../../../Types/ManagerTypes/edit_event_manager_types";

const initialState: EditEventManagerState = {
    loading: false,
    error: null,
    success: false,
    manager: null,
};

const editEventManagerSlice = createSlice({
    name: "edit_event_manager",
    initialState,
    reducers: {
        resetEditEventManager(state) {
            state.loading = false;
            state.error = null;
            state.success = false;
            state.manager = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(edit_event_manager.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(edit_event_manager.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.manager = action.payload.event_manager;
            })
            .addCase(edit_event_manager.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });
    },
});

export const { resetEditEventManager } = editEventManagerSlice.actions;
export default editEventManagerSlice.reducer;
