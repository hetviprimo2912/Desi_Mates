import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";

import type {
    UserImageDeletePayload,
    UserImageDeleteResponse,
} from "../../../Types/UsersTypes/user_image_delete_types";

export const user_image_delete = createAsyncThunk<
    UserImageDeleteResponse,
    UserImageDeletePayload,
    {
        rejectValue: string;
    }
>(
    "users/user_image_delete",

    async (payload, { rejectWithValue }) => {
        try {

            const response = await axios.post(
                "/user_image_delete",
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