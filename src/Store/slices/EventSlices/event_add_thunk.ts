import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";

import type {
    EventAddPayload,
    EventAddResponse,
} from "../../../Types/EventTypes/event_add_types";

export const event_add = createAsyncThunk<
    EventAddResponse,
    EventAddPayload,
    {
        rejectValue: string;
    }
>(
    "event/event_add",

    async (payload, { rejectWithValue }) => {
        try {
            const formData = new FormData();

            formData.append("name", payload.name);
            formData.append("description", payload.description);
            formData.append("image", payload.image);
            formData.append("price", payload.price);
            formData.append("organized_by", payload.organized_by);
            formData.append("cat_name", payload.cat_name);
            formData.append("status", payload.status.toString());
            formData.append("date", payload.date);
            formData.append("time", payload.time);

            const response = await axios.post(
                "/add_event",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
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