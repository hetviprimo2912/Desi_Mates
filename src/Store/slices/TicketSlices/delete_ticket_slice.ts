import { createSlice } from "@reduxjs/toolkit";

import { delete_ticket } from "./delete_ticket_thunk";

import type {
    DeleteTicketState,
} from "../../../Types/TicketTypes/delete_ticket_types";

const initialState: DeleteTicketState = {
    loading: false,
    error: null,

    success: false,

    message: "",
};

const deleteTicketSlice = createSlice({
    name: "delete_ticket",

    initialState,

    reducers: {},

    extraReducers: (builder) => {
        builder

            .addCase(delete_ticket.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })

            .addCase(delete_ticket.fulfilled, (state, action) => {
                state.loading = false;

                state.success = true;

                state.message = action.payload.message;
            })

            .addCase(delete_ticket.rejected, (state, action) => {
                state.loading = false;

                state.success = false;

                state.error =
                    action.payload || "Something went wrong";
            });
    },
});

export default deleteTicketSlice.reducer;