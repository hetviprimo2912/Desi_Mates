import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";
import type {
    UserDeletePayload,
    UserDeleteResponse,
} from "../../../Types/UsersTypes/user_delete_types";

export const user_delete = createAsyncThunk<
    UserDeleteResponse,
    UserDeletePayload,
    {
        rejectValue: string;
    }
>(
    "user_delete",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                "/user_delete",
                payload
            );

            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Something went wrong."
            );
        }
    }
);