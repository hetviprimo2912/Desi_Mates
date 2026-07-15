import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";

import type {
    TicketCardResponse,
} from "../../../Types/TicketTypes/ticket_card_types";

export const ticket_card = createAsyncThunk<
    TicketCardResponse,
    void,
    {
        rejectValue: string;
    }
>(
    "ticket/ticket_card",

    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                "/ticket_card"
            );

            return response.data;
        } catch (error: any) {
            const message = error.response?.data?.message;

            if (typeof message === "string") {
                return rejectWithValue(message);
            }

            return rejectWithValue("Something went wrong");
        }
    }
);