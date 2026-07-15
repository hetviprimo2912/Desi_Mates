import { createSlice } from "@reduxjs/toolkit";

import { admin_ticket_list } from "./admin_ticket_list_thunk";

import type {
    AdminTicketListState,
} from "../../../Types/TicketTypes/admin_ticket_list_types";

const initialState: AdminTicketListState = {
    loading: false,
    error: null,

    tickets: [],

    pagination: null,
};

const adminTicketListSlice = createSlice({
    name: "admin_ticket_list",

    initialState,

    reducers: {},

    extraReducers: (builder) => {
        builder

            .addCase(admin_ticket_list.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(admin_ticket_list.fulfilled, (state, action) => {
                state.loading = false;

                state.tickets = action.payload.data;

                state.pagination = action.payload.pagination;
            })

            .addCase(admin_ticket_list.rejected, (state, action) => {
                state.loading = false;

                state.error =
                    action.payload || "Something went wrong";
            });
    },
});

export default adminTicketListSlice.reducer;