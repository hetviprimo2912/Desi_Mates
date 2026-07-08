import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";

import type {
    StarSignListPayload,
    StarSignListResponse,
} from "../../../Types/StarTypes/starsign_list_types";

export const starsign_list = createAsyncThunk<
    StarSignListResponse,
    StarSignListPayload,
    { rejectValue: string }
>(
    "starsign/starsign_list",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axios.post("/starsign_list", payload);
            return response.data;
        } catch (error: any) {
            const message = error.response?.data?.message;
            if (typeof message === "string") return rejectWithValue(message);
            return rejectWithValue("Something went wrong");
        }
    }
);
