import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";

import type {
    SubscriberUserCardResponse,
} from "../../../Types/SubscribedUsersType/subscriber_user_card_types";

export const subscriber_user_card = createAsyncThunk<
    SubscriberUserCardResponse,
    void,
    { rejectValue: string }
>(
    "subscribedUsers/subscriber_user_card",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.post("/subscriber_user_card");
            return response.data;
        } catch (error: any) {
            const message = error.response?.data?.message;
            if (typeof message === "string") return rejectWithValue(message);
            return rejectWithValue("Something went wrong");
        }
    }
);
