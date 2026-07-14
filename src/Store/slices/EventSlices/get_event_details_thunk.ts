import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";

import type {
    GetEventDetailsPayload,
    GetEventDetailsResponse,
} from "../../../Types/EventTypes/edit_event_types";

export const get_event_details = createAsyncThunk<
    GetEventDetailsResponse,
    GetEventDetailsPayload,
    {
        rejectValue: string;
    }
>(
    "event/get_event_details",

    async (payload, { rejectWithValue }) => {
        try {

            const formData = new FormData();

            formData.append("id", payload.id);

            const response = await axios.post(
                "/edit_event",
                formData
            );

            return response.data;

        } catch (error: any) {

            return rejectWithValue(
                error?.response?.data?.message ||
                "Something went wrong"
            );

        }
    }
);