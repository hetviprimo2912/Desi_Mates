import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";

import type {
    EventManagerListPayload,
    EventManagerListResponse,
} from "../../../Types/ManagerTypes/event_manager_list_types";

export const event_manager_list = createAsyncThunk<
    EventManagerListResponse,
    EventManagerListPayload,
    {
        rejectValue: string;
    }
>(
    "manager/event_manager_list",

    async (payload, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                "/event_manager_list",
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