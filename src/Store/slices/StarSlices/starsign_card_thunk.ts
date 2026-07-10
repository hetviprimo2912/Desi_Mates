import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";
import type { StarsignCardResponse } from "../../../Types/StarTypes/starsign_card_types";

export const starsign_card = createAsyncThunk<
    StarsignCardResponse,
    void,
    { rejectValue: string }
>(
    "starsign/starsign_card",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.post("/starsign_card");
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || "Something went wrong");
        }
    }
);
