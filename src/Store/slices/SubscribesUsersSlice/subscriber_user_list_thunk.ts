import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";

import type {
    SubscriberUserListPayload,
    SubscriberUserListResponse,
} from "../../../Types/SubscribedUsersType/subscriber_user_list_types";

export const subscriber_user_list = createAsyncThunk<
    SubscriberUserListResponse,
    SubscriberUserListPayload,
    { rejectValue: string }
>(
    "subscribedUsers/subscriber_user_list",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axios.post("/subscriber_user_list", payload);
            return response.data;
        } catch (error: any) {
            const message = error.response?.data?.message;
            if (typeof message === "string") return rejectWithValue(message);
            return rejectWithValue("Something went wrong");
        }
    }
);
