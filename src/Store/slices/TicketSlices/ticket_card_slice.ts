import { createSlice } from "@reduxjs/toolkit";

import { ticket_card } from "./ticket_card_thunk";

import type {
    TicketCardState,
} from "../../../Types/TicketTypes/ticket_card_types";

const initialState: TicketCardState = {
    loading: false,
    error: null,

    data: null,
};

const ticketCardSlice = createSlice({
    name: "ticket_card",

    initialState,

    reducers: {},

    extraReducers: (builder) => {
        builder

            .addCase(ticket_card.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(ticket_card.fulfilled, (state, action) => {
                state.loading = false;

                state.data = action.payload.data;
            })

            .addCase(ticket_card.rejected, (state, action) => {
                state.loading = false;

                state.error =
                    action.payload || "Something went wrong";
            });
    },
});

export default ticketCardSlice.reducer;