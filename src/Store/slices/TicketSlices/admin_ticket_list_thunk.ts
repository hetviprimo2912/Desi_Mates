import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";

import type {
    AdminTicketListPayload,
    AdminTicketListResponse,
} from "../../../Types/TicketTypes/admin_ticket_list_types";

export const admin_ticket_list = createAsyncThunk<
    AdminTicketListResponse,
    AdminTicketListPayload,
    {
        rejectValue: string;
    }
>(
    "ticket/admin_ticket_list",

    async (payload, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                "/admin_ticket_list",
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