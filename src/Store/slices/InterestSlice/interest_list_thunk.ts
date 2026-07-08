import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";

import type {
    InterestListPayload,
    InterestListResponse,
} from "../../../Types/InterestTypes/interest_list_types";

export const interest_list = createAsyncThunk<
    InterestListResponse,
    InterestListPayload,
    {
        rejectValue: string;
    }
>(
    "interest/interest_list",

    async (payload, { rejectWithValue }) => {

        try {

            const response = await axios.post(
                "/interest_list",
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