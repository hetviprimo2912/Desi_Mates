import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";

import type {
    EventManagerCardResponse,
} from "../../../Types/ManagerTypes/event_manager_card_types";

export const event_manager_card = createAsyncThunk<
    EventManagerCardResponse,
    void,
    {
        rejectValue: string;
    }
>(
    "manager/event_manager_card",

    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                "/event_manager_card"
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