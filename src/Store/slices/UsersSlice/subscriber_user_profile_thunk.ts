import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";
import type { UserProfilePayload, UserProfileResponse } from "../../../Types/UsersTypes/user_profile_types";

export const subscriber_user_profile = createAsyncThunk<
    UserProfileResponse,
    UserProfilePayload,
    { rejectValue: string }
>(
    "users/subscriber_user_profile",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axios.post("/subscriber_user_profile", payload);
            return response.data;
        } catch (error: any) {
            const message = error.response?.data?.message;
            if (typeof message === "string") return rejectWithValue(message);
            return rejectWithValue("Something went wrong");
        }
    }
);
