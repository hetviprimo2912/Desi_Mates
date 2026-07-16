import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";

import type {
    UserApprovedPayload,
    UserApprovedResponse,
} from "../../../Types/UsersTypes/user_approved_types";

export const user_approved = createAsyncThunk<
    UserApprovedResponse,
    UserApprovedPayload,
    {
        rejectValue: string;
    }
>(
    "users/user_approved",

    async (payload, { rejectWithValue }) => {

        try {

            const response = await axios.post(
                "/user_approved",
                payload
            );

            return response.data;

        } catch (error: any) {

            const message =
                error.response?.data?.message;

            if (typeof message === "string") {

                return rejectWithValue(message);

            }

            return rejectWithValue(
                "Something went wrong"
            );

        }

    }
);