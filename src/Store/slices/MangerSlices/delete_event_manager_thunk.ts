import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";

import type {
    DeleteEventManagerPayload,
    DeleteEventManagerResponse,
} from "../../../Types/ManagerTypes/delete_event_manager_types";

export const delete_event_manager = createAsyncThunk<
    DeleteEventManagerResponse,
    DeleteEventManagerPayload,
    {
        rejectValue: string;
    }
>(
    "manager/delete_event_manager",

    async (payload, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                "/delete_event_manager",
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