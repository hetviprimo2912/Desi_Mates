import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";

import type {
    DeleteTicketPayload,
    DeleteTicketResponse,
} from "../../../Types/TicketTypes/delete_ticket_types";

export const delete_ticket = createAsyncThunk<
    DeleteTicketResponse,
    DeleteTicketPayload,
    {
        rejectValue: string;
    }
>(
    "ticket/delete_ticket",

    async (payload, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                "/delete_ticket",
                payload
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