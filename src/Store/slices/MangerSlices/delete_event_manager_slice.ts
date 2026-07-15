import { createSlice } from "@reduxjs/toolkit";

import { delete_event_manager } from "./delete_event_manager_thunk";

import type {
    DeleteEventManagerState,
} from "../../../Types/ManagerTypes/delete_event_manager_types";

const initialState: DeleteEventManagerState = {
    loading: false,
    error: null,

    success: false,

    message: "",
};

const deleteEventManagerSlice = createSlice({
    name: "delete_event_manager",

    initialState,

    reducers: {},

    extraReducers: (builder) => {
        builder

            .addCase(delete_event_manager.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })

            .addCase(delete_event_manager.fulfilled, (state, action) => {
                state.loading = false;

                state.success = true;

                state.message = action.payload.message;
            })

            .addCase(delete_event_manager.rejected, (state, action) => {
                state.loading = false;

                state.success = false;

                state.error =
                    action.payload || "Something went wrong";
            });
    },
});

export default deleteEventManagerSlice.reducer;     