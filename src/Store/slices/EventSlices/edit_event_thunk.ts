import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";

import type {
    EditEventPayload,
    EditEventResponse,
} from "../../../Types/EventTypes/edit_event_types";

export const edit_event = createAsyncThunk<
    EditEventResponse,
    EditEventPayload,
    {
        rejectValue: string;
    }
>(
    "event/edit_event",

    async (payload, { rejectWithValue }) => {
        try {

            const formData = new FormData();

            formData.append("id", payload.id);
            formData.append("name", payload.name);
            formData.append("description", payload.description);
            formData.append("price", payload.price);
            formData.append("organized_by", payload.organized_by);
            formData.append("cat_name", payload.cat_name);
            formData.append("is_status", String(payload.is_status));

            formData.append("date", payload.date);
            formData.append("time", payload.time);

            if (payload.image) {
                formData.append("image", payload.image);
            }

            const response = await axios.post(
                "/edit_event",
                formData,
                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data",
                    },
                }
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